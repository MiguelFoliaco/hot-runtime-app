import { env } from "./utils"
import { WWW } from "./www"

const main = () => {
    const www = new WWW()
    www.listen(Number(env('PORT')), false)
}

main()