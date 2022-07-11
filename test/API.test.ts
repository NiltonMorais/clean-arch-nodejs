import axios from "axios";

test("Deve chamar /items", async function () {
    const response = await axios({
        url: "http://localhost:3000/items",
        method: "GET",
    });
    const items = response.data;
    expect(items).toHaveLength(3);
});
