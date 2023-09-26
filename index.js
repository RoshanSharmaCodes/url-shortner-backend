import express from "express";
import dotenv from 'dotenv';
const app = express()
dotenv.config();
import { createClient } from "@supabase/supabase-js"

const supabaseConnection = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.get("/:id", async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabaseConnection.from("urls").select("mainurl").eq("id", id)
  console.log(data)
  if (error) {
    res.status(404).json({ error: "Not Found" })
  } else {
    // res.status(200).json({url:data[0]["mainurl"]})
    res.writeHead(200, {
        Location: data[0]["mainurl"]
      }).end();
  }
})

app.listen(4000, () => {
  console.log("Server is Up and Running!")
})
