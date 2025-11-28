import { registerPlugin } from "@capacitor/core";


export interface IGooglePayPlugin {
  makePayment: () => Promise<{token: string}>
}

const googlePayPlugin = registerPlugin<IGooglePayPlugin>('GooglePayPlugin')
export default googlePayPlugin;
