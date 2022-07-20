import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean //revalidatedが成功したかどうか
}
type Msg = {
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Revalidating notes page...')
  console.log(req.query.secret)
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    console.log('error...')
    return res.status(401).json({ message: 'Your secret is invalid !' })
  }
  let revalidated = false
  //ondemand-ISRの処理
  try {
    await res.unstable_revalidate('/notes')
    //再生成したいページのパスを渡す //最新バージョンres.unstable_revalidate ---> res.revalidate

    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}
