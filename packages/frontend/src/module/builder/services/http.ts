import { config } from "../../../configs/constants";
import { RequestTools } from "../../../utils/requestTools";

export const api = new RequestTools({
    uri: `${config.api}/api`,
})