import Cpf from "../../../../src/domain/entity/Cpf";

test("Deve validar um cpf válido", function () {
    const cpf = new Cpf("935.411.347-80");
    expect(cpf.value).toBe("935.411.347-80");
});

test("Deve validar um cpf inválido com string vazia", function () {
    expect(() => new Cpf("")).toThrow(new Error("CPF Inválido"));
});

test("Deve validar um cpf inválido com apenas 1 digito", function () {
    expect(() => new Cpf("1")).toThrow(new Error("CPF Inválido"));
});

const wrongSameDigitCpf = [
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33",
];

test.each(wrongSameDigitCpf)(
    "Deve validar um cpf inválido com todos os números iguais",
    function (cpf) {
        expect(() => new Cpf(cpf)).toThrow(new Error("CPF Inválido"));
    }
);
