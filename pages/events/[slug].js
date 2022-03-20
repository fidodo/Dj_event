 import {useRouter} from "next/router"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

export default function EventPage({ evt }) {
    const router = useRouter()
   console.log(router) 
  return (
    <Layout>
        <h1>
            {evt.name}
        </h1>
        {/* <h3>{router.query.slug}</h3>
        <button onClick={()=> router.push("/")}>Button</button> */}
    </Layout>
  )
}

// using server side props
// export async function getServerSideProps({
//   query: {slug}}){
//    const res = await fetch(`${API_URL}/api/events/${slug}`)

//    const events = await res.json()

//     return {
//       props:{
//         evt: events[0]
//       },
//     }
//   }

export async function getStaticPaths(){
  const res = await fetch (`${API_URL}/api/events`)
  const events = await res.json()

  const paths= events.map(evt=>({
    params:{slug: evt.slug}
  }))

  return{
    paths,
    fallback: true,
  }
}

export async function getStaticProps({
    params: {slug}}){
     const res = await fetch(`${API_URL}/api/events/${slug}`)
  
     const events = await res.json()
  
      return {
        props:{
          evt: events[0]
        },
        revalidate:1
      }
    }