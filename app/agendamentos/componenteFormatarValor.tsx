import { formatarMoeda } from "@/utils/formatarMoeda";


interface formValor {
    valor: number;
}

export default function ComponenteFormatarValor(resp: formValor) {

    if (resp.valor == 60) {
        return <>
            <input type="text" name="txtModelo" placeholder={"Combo: Corte | Barba | Sobrancelha: " + formatarMoeda(resp.valor)} id="" />
        </>
    } else if (resp.valor == 35) {
        return <>
           <input type="text" name="txtModelo" placeholder={"Corte tradicional: " + formatarMoeda(resp.valor)} id="" />
        </>
    } else if (resp.valor == 15) {
        return <>
            <input type="text" name="txtModelo" placeholder={"Barba Completa: " + formatarMoeda(resp.valor)} id="" />
        </>
    } else if (resp.valor == 10){
           return <>
            <input type="text" name="txtModelo" placeholder={"Sobrancelha: " + formatarMoeda(resp.valor)} id="" />
        </>
    }


}