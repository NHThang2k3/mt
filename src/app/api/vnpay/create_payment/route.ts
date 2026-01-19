import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { format } from 'date-fns';
import qs from 'qs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, orderId, orderInfo } = body;

    const tmnCode = process.env.VNP_TMN_CODE?.trim();
    const secretKey = process.env.VNP_HASH_SECRET?.trim();
    const vnpUrl = process.env.VNP_URL?.trim();
    const returnUrl = process.env.VNP_RETURN_URL?.trim();

    if (!tmnCode || !secretKey || !vnpUrl || !returnUrl) {
      console.error('VNPay config missing:', { tmnCode: !!tmnCode, secretKey: !!secretKey, vnpUrl: !!vnpUrl, returnUrl: !!returnUrl });
      return NextResponse.json({ error: 'VNPay config missing' }, { status: 500 });
    }

    const date = new Date();
    const createDate = format(date, 'yyyyMMddHHmmss');

    // IP Address
    let ipAddr = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (ipAddr === '::1') ipAddr = '127.0.0.1';

    const currCode = 'VND';
    let vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId.toString().replace(/-/g, '').slice(0, 24); // Rút gọn UUID xuống 24 ký tự
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + orderId.toString().slice(0, 8);
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = Math.round(amount * 100);
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    // Sắp xếp tham số theo alphabet
    // Sắp xếp tham số theo alphabet và encode
    vnp_Params = sortAndEncodeObject(vnp_Params);

    // Tạo chuỗi data để băm (Tên tham số=Giá trị tham số, nối bằng &)
    const signData = Object.keys(vnp_Params).map(key => `${key}=${vnp_Params[key]}`).join('&');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Thêm chữ ký vào bộ tham số
    vnp_Params['vnp_SecureHash'] = signed;

    // Tạo URL cuối cùng (phải encode lại các giá trị)
    const paymentUrl = vnpUrl + '?' + Object.keys(vnp_Params).map(key => `${key}=${vnp_Params[key]}`).join('&');

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error('VNPay error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const secretKey = process.env.VNP_HASH_SECRET?.trim();
    if (!secretKey) {
      console.error('VNPay config missing: secretKey');
      return NextResponse.json({ error: 'VNPay config missing' }, { status: 500 });
    }

    let vnp_Params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sort and encode parameters for verification
    vnp_Params = sortAndEncodeObject(vnp_Params);

    // Create signData string manually
    const signData = Object.keys(vnp_Params).map(key => `${key}=${vnp_Params[key]}`).join('&');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const responseCode = req.nextUrl.searchParams.get('vnp_ResponseCode');
      const txnRef = req.nextUrl.searchParams.get('vnp_TxnRef');
      if (responseCode === '00') {
        return NextResponse.json({ success: true, txnRef: txnRef });
      } else {
        return NextResponse.json({ success: false, code: responseCode });
      }
    } else {
      return NextResponse.json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ success: false, message: 'Internal error' });
  }
}

function sortAndEncodeObject(obj: any) {
  let sorted: any = {};
  let str: string[] = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[decodeURIComponent(str[key])]).replace(/%20/g, '+');
  }
  return sorted;
}
