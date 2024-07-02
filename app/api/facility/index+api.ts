import { listFacility, insertFacility } from "@/query/arango/facility";
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    const revampPage = Number(page) - 1;

    const facility = await listFacility(
      revampPage * Number(limit),
      Number(limit)
    );

    return Response.json({ data: facility, status: true });
  } catch (error) {
    return Response.json({ status: false, error }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const insert = await insertFacility(body);
    console.log(insert);
    return Response.json({ data: insert, status: true });
  } catch (error) {
    return Response.json({ status: false, error }, { status: 400 });
  }
}
