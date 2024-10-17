import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield, User } from 'lucide-react';
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
// import { readContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";


type UserType = 'government' | 'contractor' | 'citizen' | '';

const ADMIN_WALLET_ADDRESS = '0xd3ED43e5A34617c81e2dbE70b8539C2723F7eD6a';

export default async function Login() {
  const [userType, setUserType] = useState<UserType>('');
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();
  const address = useAddress();

  useEffect(() => {
    if (address === ADMIN_WALLET_ADDRESS && userType === 'government') {
      navigate('/gov-dashboard');
    }
  }, [address, userType, navigate]);

  const handleLogin = (e: React.FormEvent, type: 'gov-contractor' | 'citizen') => {
    e.preventDefault();

    if (type === 'gov-contractor') {
      if (userType === 'government' && address === ADMIN_WALLET_ADDRESS) {
        navigate('/gov-dashboard');
      } else if (userType === 'contractor') {
        navigate('/contractor-dashboard');
      }
    } else {
      navigate('/citizenHome');
    }
  };

  // create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: "9eb166f7a2b9521cf1a2ff016e422a70"
 });

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(80002),
  address: "0x7874671859088Ef8F46CDC9216b8cF585BFa827F"
});

const { data, isPending } = useReadContract({
  contract,
  method: "function contractorName() view returns (string)",
  params: []
});
  

    // useEffect to log the data whenever it changes
    useEffect(() => {
      if (data !== undefined) {
        console.log("Data:", data);
      }
    }, [data]); // Dependency array to trigger the effect when data changes
  

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary/10 to-secondary/10">
      <div
        className={`flex-1 flex items-center justify-center transition-colors duration-300 ${hoveredSide === 'left' ? 'bg-black/10' : ''}`}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Card className="w-full max-w-md shadow-lg m-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Government & Contractor</CardTitle>
            <CardDescription className="text-center">
              Login to access your professional account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 flex flex-col items-center">
              <ConnectWallet className="w-full max-w-xs" />

              <div>
      {isPending ? <p>Loading...</p> : <p>Data: {data}</p>}
    </div>
            </div>
            <Separator />
            <form onSubmit={(e) => handleLogin(e, 'gov-contractor')} className="space-y-4">
              <Select value={userType} onValueChange={(value: UserType) => setUserType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full" disabled={!userType}>
                <Shield className="mr-2 h-4 w-4" /> Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div
        className={`flex-1 flex items-center justify-center transition-colors duration-300 ${hoveredSide === 'right' ? 'bg-black/10' : ''}`}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Card className="w-full max-w-md shadow-lg m-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Citizen Login</CardTitle>
            <CardDescription className="text-center">
              Access your citizen services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <form onSubmit={(e) => handleLogin(e, 'citizen')} className="space-y-4">
              <Button type="submit" className="w-full">
                <User className="mr-2 h-4 w-4" /> Sign in as Citizen
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
