import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import qs from 'qs';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    let vnp_Params: any = {};

    searchParams.forEach((value, key) => {
      vnp_Params[key] = value;
    });

    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // 1. Sort parameters alphabetically
    vnp_Params = sortObject(vnp_Params);

    const secretKey = process.env.VNP_HASH_SECRET?.trim();
    if (!secretKey) {
      return NextResponse.json({ success: false, message: 'Secret key missing' });
    }

    // 2. Create signData with strict URL encoding (space to +)
    const signData = qs.stringify(vnp_Params, { encode: true, encodeValuesOnly: false })
      .replace(/%20/g, '+');

    // 3. HMAC-SHA512
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const responseCode = vnp_Params['vnp_ResponseCode'];
      const txnRef = vnp_Params['vnp_TxnRef'];
      if (responseCode === '00') {
        return NextResponse.json({ success: true, txnRef: txnRef });
      } else {
        return NextResponse.json({ success: false, code: responseCode });
      }
    } else {
      console.error('Signature mismatch:', { expected: signed, received: secureHash });
      return NextResponse.json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Verify route error:', error);
    return NextResponse.json({ success: false, message: 'Internal error' });
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
