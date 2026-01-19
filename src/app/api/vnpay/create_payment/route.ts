import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { format } from 'date-fns';
import qs from 'qs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, orderId } = body;

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

    let ipAddr = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (ipAddr.includes(',')) ipAddr = ipAddr.split(',')[0].trim();
    if (ipAddr === '::1') ipAddr = '127.0.0.1';

    const currCode = 'VND';
    let vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId.toString().replace(/-/g, '').slice(0, 24);
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + orderId.toString().slice(0, 8);
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = Math.round(amount * 100);
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    // 1. Sort parameters alphabetically
    vnp_Params = sortObject(vnp_Params);

    // 2. Create signData with strict URL encoding (space to +)
    // Keys and values must be encoded
    const signData = qs.stringify(vnp_Params, { encode: true, encodeValuesOnly: false })
      .replace(/%20/g, '+');

    // 3. HMAC-SHA512
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;

    // 4. Final URL
    const finalQuery = qs.stringify(vnp_Params, { encode: true, encodeValuesOnly: false })
      .replace(/%20/g, '+');
    const paymentUrl = vnpUrl + '?' + finalQuery;

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error('VNPay POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function sortObject(obj: any) {
  let sorted: any = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(key);
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = obj[str[key]];
  }
  return sorted;
}

