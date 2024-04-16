"use client"
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from './my-global-context';

type Props = {}

const ImageUpload = (props: Props) => {

    const supabase = createClient()
    const [source, setSource] = useState<string>('')


    const [file, setFile] = useState<any>([])
    const { value } = useGlobalContext()
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const fileName = file.name

        // const { error } = await supabase.storage.from("images").upload(`${value}/${fileName}`, file, { cacheControl: "3600", upsert: false })
        // const { data } =  supabase.storage.from("images").getPublicUrl("XBOX_controller.png")
        // const { data } = await supabase.storage.from("images").createSignedUrl()
        // setSource(data.publicUrl)
        // if(error) {
        //     console.log(error)
        //     console.log("Something went WONG")
        // } else {
        //     console.log("YES")
        // }

    }

    const handleFileSelected = (e: any) => {
        setFile(e.target.files[0]);
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit">Upload image</button>
        <Image 
            src={source}
            height={100}
            width={100}
            alt='image'
        />
    </form>
  )
}

export default ImageUpload