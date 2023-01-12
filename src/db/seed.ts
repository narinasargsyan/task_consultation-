import client from "./models/clients";
import lawyer from "./models/lawyer";
const seed = async function() {
    try {
        await client.deleteMany();
        await lawyer.deleteMany();
        await client.create([
            { firstName: "Client",lastName:"1", patronymic: "Jack",phone:"1234567989",password: "111122223" },
            { firstName: "Client",lastName:"2", patronymic: "Jony",phone:"12341234",password: "123412341" },
        ]);
        await lawyer.create([
            { firstName: "Lawyer",lastName:"1", patronymic: "Kirill",phone:"123456789",password: "1451451451", laws:"civil law" },
            { firstName: "Lawyer",lastName:"2", patronymic: "Dany",phone:"134134134",password: "123123123123"},
        ]);
        console.log("Database seeded.");
    }
    catch (err){
        console.log("error=>",err)
    }
};
export default seed;
