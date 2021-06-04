let mod = (number:number, mod:number)=>{
    return (number % mod == 0)
}
export let fizzbuzz =( number : number)=>{
    if (number ==0) return number 
    if (mod(number,3) && mod(number,5)) return "fizzbuzz"
    if (mod(number,3) ) return "fizz"
    if (mod(number,5) ) return "buzz"
    return number
}

for (let i = 0 ; i<= 20 ; i++){
    console.log(fizzbuzz(i))
}