// pages/api/getMods.tsx
// import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import { buildQueryString } from '@/util';

// const apiURl = process.env.API_URL || 'http://127.0.0.1:50000';

export default async function GET() {
    console.log("all-users API");
    // const { query } = req;
    // const queryString = buildQueryString(query);
    // const response = await fetch(`${apiURl}/users?${queryString}`);
    // const responseData = await response.json();
    // const { success } = responseData;
    const success = true;
    const responseData = {data : true};
    if(success){
        return NextResponse.json({ responseData });
    }
    // else{
    //     console.log('Error: ', responseData.message);
    //     return new Response(responseData.message, { status: 500 });
    // }

}
