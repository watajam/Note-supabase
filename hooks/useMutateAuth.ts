import { useState } from 'react'
import { supabase } from '../utils/supabase'
import { useMutation } from 'react-query'
export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }

  //ログイン関数（react-quey + supabase）
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw new Error(error.message)
    },
    //非同期処理が終了した時に呼ばれる（onSucsess or onError）
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  //新規ユーザー登録関数（react-quey + supabase）
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  }
}