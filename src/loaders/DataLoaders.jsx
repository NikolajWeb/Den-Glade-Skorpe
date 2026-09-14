import { serverPath } from "../settings";

const getData = async (
    path,
    errorText = "Fejl ved hentning"
) => {
    const res = await fetch(`${serverPath}${path}`);

    if (!res.ok) {
        throw new Response(errorText, {
            status: res.status,
        });
    }

    const json = await res.json();
    return json.data;
};

export const backofficeLoader = async () => {
    const [
        categories,
        dishes,
        employees,
        ingredients,
        messages,
        orders,
        users,
    ] = await Promise.all([
        getData("/categories"),
        getData("/dishes"),
        getData("/employees"),
        getData("/ingredients"),
        getData("/messages"),
        getData("/orders"),
        getData("/users"),
    ]);

    return {
        categories,
        dishes,
        employees,
        ingredients,
        messages,
        orders,
        users,
    };
};

export default backofficeLoader;