import { ICheckNetworkParams } from "@/interfaces/webs.interface";

export const checkNetwork = async (data: ICheckNetworkParams) => {
  if (!data.isConnected) {
    console.log("========== 链接钱包 ==========");
    const connectResult = await data.connectAsync();
    console.log("onSubmit connectResult", connectResult);
    if (connectResult.chain.id !== data.chainID) {
      console.log("========== 选择网络 ==========");
      console.log("chain?.id", connectResult.chain.id);
      console.log("data.chain", connectResult.chain);
      console.log("onSubmit chain", connectResult.chain.id !== data.chainID);
      const switchResult = await data.switchNetworkAsync?.(connectResult.chain.id);
      console.log("onSubmit switchResult", switchResult);
    }
  } else if (data.chain?.id !== data.chainID) {
    console.log("========== 选择网络 ==========");
    console.log("chain?.id", data.chain?.id);
    console.log("data.chain", data.chain);
    console.log("onSubmit chain", data.chain?.id !== data.chainID);
    const switchResult = await data.switchNetworkAsync?.(data.chain?.id);
    console.log("onSubmit switchResult", switchResult);
  }
}
