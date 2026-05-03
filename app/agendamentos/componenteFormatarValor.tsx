import { formatarMoeda } from "@/utils/formatarMoeda";


interface formValor {
    valor: number;
}

export default function ComponenteFormatarValor(resp: formValor) {

    if (resp.valor == 45) {
        return <>
            <input type="text" name="txtModelo" placeholder={"Corte | barba: " + formatarMoeda(resp.valor)} id="" />
        </>
    } else if (resp.valor == 35) {
        return <>
           <input type="text" name="txtModelo" placeholder={"Corte: " + formatarMoeda(resp.valor)} id="" />
        </>
    } else if (resp.valor == 10) {
        return <>
            <input type="text" name="txtModelo" placeholder={"barba: " + formatarMoeda(resp.valor)} id="" />
        </>
    }


}