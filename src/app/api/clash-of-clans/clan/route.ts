import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { NextResponse } from "next/server";
import EventEmitter from "node:events";

import { env } from "../../../../../env.mjs";

const clashAxios = axios.create({
  baseURL: "https://api.clashofclans.com/v1",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  console.log(`========= tag: ${tag} =========`);
  let message = "Don't have tag field.";
  if (tag) {
    const response = await creatRequestList(tag);

    const success = response.find((d) => (d as AxiosResponse)?.data);

    console.log("success", !!success);
    if (success) {
      return NextResponse.json(
        {
          code: 200,
          success: true,
          message: "success",
          data: (success as AxiosResponse).data,
        },
        { status: 200 },
      );
    }

    message = (response[0] as AxiosError)?.message;
  }
  return NextResponse.json(
    {
      code: 500,
      success: false,
      message: message,
      data: null,
    },
    { status: 500 },
  );
}

const creatRequestList = async (tag: string) => {
  const max = 20;
  EventEmitter.defaultMaxListeners = max;

  const controller = new AbortController();

  const requestList = new Array(max).fill(0).map((_, index) => {
    return createRequestItem(tag, controller, index);
  });

  return new Promise<Array<AxiosResponse | AxiosError>>((resolve) => {
    Promise.all(requestList).then((res) => {
      resolve(res);
    });
  });
};

const createRequestItem = async (
  tag: string,
  controller: AbortController,
  index: number,
): Promise<AxiosResponse | AxiosError> => {
  try {
    const responseData = await clashAxios.request({
      url: `/clans/${encodeURIComponent(`#${tag}`)}`,
      httpsAgent: new HttpsProxyAgent(`http://36.37.146.119:32650`),
      proxy: false,
      timeout: 5000,
      signal: controller.signal,
      headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` },
    });
    console.log("success index", index);
    controller.abort();
    return responseData;
  } catch (error) {
    console.log("error index", index);
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error:", (error as any).message);
    }
    return error as AxiosError;
  }
};
