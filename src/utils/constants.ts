// import {createThirdwebClient, defineChain, getContract} from  'thirdweb'

// const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

// export  const  client = createThirdwebClient({
//     clientId: CLIENT_ID as string,
//   })

//   // create the client with your clientId, or secretKey if in a server environment
// // export const client = createThirdwebClient({
// //   clientId: "9eb166f7a2b9521cf1a2ff016e422a70"
// // });

// export const myChain = defineChain(80002);

// export const contract = getContract({
//   client : client,
//   chain: defineChain(80002), // Polygon Mumbai testnet chain ID
//   address: "0x7874671859088Ef8F46CDC9216b8cF585BFa827F"
// });
import { createThirdwebClient, defineChain, getContract } from 'thirdweb';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("VITE_CLIENT_ID is not defined in the environment variables.");
}

// Create the client with your clientId
export const client = createThirdwebClient({
  clientId: CLIENT_ID,
});

// Define the chain (Polygon Mumbai testnet chain ID)
export const myChain = defineChain(80002);

// Connect to your contract
export const contract = getContract({
  client: client,
  chain: myChain,
  address: "0x7874671859088Ef8F46CDC9216b8cF585BFa827F",
});
