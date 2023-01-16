import {
	Box,
	HStack,
	Progress,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { ProfileForm } from "../../components/register/profile-form";
import { RegisterForm } from "../../components/register/register-form";

const RegisterPage = () => {
	const [step, setStep] = useState(0);

	return (
		<Box
			height={"100vh"}
			width={"100%"}
			alignItems="center"
			justifyContent={"space-evenly"}
			paddingX={10}
		>
			<HStack mb={4}>
				<Box mr={2}>
					<Text fontSize="xl">Step {step + 1} of 2</Text>
				</Box>
				<Progress value={80} />
				<Tabs variant="soft-rounded" index={step} onChange={() => {}}>
					<TabList bgColor={"Background"} opacity={"50%"}>
						<Tab>Account</Tab>
						<Tab>Profile</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<RegisterForm setStep={setStep} />
						</TabPanel>
						<TabPanel>
							<ProfileForm />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</HStack>
		</Box>
	);
};

export default RegisterPage;