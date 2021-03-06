import { get } from "uicommon/rest/rest";
import url from "uicommon/util/url";
import { resolveList } from "uicommon/rest/rest";

const END_POINT = "/api/products";

export default {
    getProducts: function({limit, offset}) {
        let endPoint = url.toUrl(END_POINT, {limit, offset});

        return get(endPoint).then(resolveList);
    }
};