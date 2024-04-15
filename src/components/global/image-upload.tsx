"use client"
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";

type Props = {}

const ImageUpload = (props: Props) => {

    const supabase = createClient()
    const [source, setSource] = useState<string>('')


    const [file, setFile] = useState<any>([])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        // const filename = `${uuidv4()}-${file.name}`;
        // console.log(file," OUR FIKLE")

        // const { data, error } = await supabase.storage
        // .from("images")
        // .upload(filename, file, {
        //     cacheControl: "3600",
        //     upsert: false,
        // });


        // const filepath = data?.path;
        // save filepath in database
        const fileName = file.name

        const { data, error } = await supabase.storage.from("images").upload(fileName, file, { cacheControl: "3600", upsert: false })

        // const {data} = supabase.storage.from("images").getPublicUrl("torii.jpg")
        // setSource(data.publicUrl)

        if(error) {
            console.log(error)
            console.log("Something went WONG")
        } else {
            console.log("YES")
        }

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