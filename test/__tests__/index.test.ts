import {fizzbuzz} from "../../src/index"

describe("fizzbuzz",()=>{
    test("should print 1 if ther recieve 1",()=>{
        const expected = 1;
        const result = fizzbuzz(1);
        expect(expected).toBe(result);
    })
    test("should print fizz if the number is 3",()=>{
        const expected = "fizz";
        const result = fizzbuzz(3);
        expect(expected).toBe(result);
    })

    test("should print fizz if the multiple is 3",()=>{
        const expected = "fizz";
        const result = fizzbuzz(6);
        expect(expected).toBe(result);
    })

    test("should print fizz if the number is 5",()=>{
        const expected = "buzz";
        const result = fizzbuzz(5);
        expect(expected).toBe(result);
    })

    test("should print fizz if the multiple is 5",()=>{
        const expected = "buzz";
        const result = fizzbuzz(10);
        expect(expected).toBe(result);
    })

    test("should print fizz if the number is 15",()=>{
        const expected = "fizzbuzz";
        const result = fizzbuzz(15);
        expect(expected).toBe(result);
    })

    test("should print fizz if the multiple is 30",()=>{
        const expected = "fizzbuzz";
        const result = fizzbuzz(30);
        expect(expected).toBe(result);
    })
    
})