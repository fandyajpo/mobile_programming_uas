import {
  facilityById,
  removeFacility,
  updateFacility,
} from "@/query/arango/facility";

export async function GET(_request: Request, { _key }: { _key: string }) {
  try {
    const facility = await facilityById(_key);
    return Response.json({ data: facility, status: true });
  } catch (error) {
    return Response.json({ status: false, error }, { status: 400 });
  }
}

export async function PATCH(request: Request, { _key }: { _key: string }) {
  try {
    const body = await request.json();
    const facility = await updateFacility(_key, body);
    return Response.json({ data: facility, status: true });
  } catch (error) {
    return Response.json({ status: false, error }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { _key }: { _key: string }) {
  try {
    const facility = await removeFacility(_key);
    return Response.json({ data: facility, status: true });
  } catch (error) {
    return Response.json({ status: false, error }, { status: 400 });
  }
}
