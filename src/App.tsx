import { useState, useEffect } from "react";
import { ThirdwebProvider, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";

const contractAddress = "0x7874671859088Ef8F46CDC9216b8cF585BFa827F";

export function ContractInteraction() {
  const { contract } = useContract(contractAddress);
  const [newProjectName, setNewProjectName] = useState("");

  // Read project name using the contract instance
  const { data: projectName, isLoading: isProjectNameLoading, error: projectNameError } = useContractRead(contract, "projectName");

  // Write to contract to set project name
  const { mutate: setProjectName, isLoading: isSetting, error: setError } = useContractWrite(contract, "setProjectName");

  const handleSetProjectName = () => {
    if (newProjectName) {
      setProjectName([newProjectName], {
        onSuccess: () => {
          console.log("Project name updated successfully!");
        },
        onError: (error) => {
          console.error("Failed to update project name:", error);
        },
      });
    }
  };

  // Log the project name or handle loading and error states
  useEffect(() => {
    if (projectName) {
      console.log("Project Name:", projectName);
    }
    if (projectNameError) {
      console.error("Error reading project name:", projectNameError);
    }
  }, [projectName, projectNameError]);

  return (
    <div>
      <h1>Smart Contract Interaction</h1>
      
      {/* Display Current Project Name */}
      {isProjectNameLoading ? (
        <p>Loading project name...</p>
      ) : (
        <p>Project Name: {projectName || "No project name found"}</p>
      )}
      {projectNameError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <p>{String(projectNameError.message)}</p>
        </Alert>
      )}

      {/* Input to Set New Project Name */}
      <div>
        <input 
          type="text" 
          value={newProjectName} 
          onChange={(e) => setNewProjectName(e.target.value)} 
          placeholder="Enter new project name" 
        />
        <button onClick={handleSetProjectName} disabled={isSetting}>
          {isSetting ? "Updating..." : "Set Project Name"}
        </button>
      </div>

      {setError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <p>{String(setError.message)}</p>
        </Alert>
      )}
    </div>
  );
}

export default function App() {
  const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID; // Use the environment variable

  return (
    <ThirdwebProvider 
      clientId={clientId} // Use the clientId from env variable
      activeChain={PolygonAmoyTestnet}
    >
      <ContractInteraction />
    </ThirdwebProvider>
  );
}
