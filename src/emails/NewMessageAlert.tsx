import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface Props {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export default function NewMessageAlert({ name, email, subject, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>SUR-RON Client Message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={logo}>SURON</Heading>
          <Text style={sub}>Electric Bikes — Client Message</Text>
          <Hr style={hr} />

          <Heading style={heading}>New Client Message</Heading>

          <Section style={card}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            {subject && (
              <>
                <Text style={label}>Subject</Text>
                <Text style={value}>{subject}</Text>
              </>
            )}

            <Text style={label}>Message</Text>
            <Text style={{ ...value, whiteSpace: "pre-wrap" }}>{message}</Text>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Reply directly to this email to respond to {name} at {email}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#0a0a0a", fontFamily: "Arial, Helvetica, sans-serif" };
const container = {
  backgroundColor: "#111111",
  margin: "0 auto",
  padding: "40px 32px",
  borderRadius: "16px",
  maxWidth: "520px",
  border: "1px solid rgba(255,255,255,0.08)",
};
const logo = {
  fontSize: "26px",
  fontFamily: "Georgia, serif",
  fontWeight: "bold",
  letterSpacing: "6px",
  color: "#ffffff",
  textAlign: "center" as const,
  margin: "0 0 6px",
};
const sub = {
  fontSize: "10px",
  letterSpacing: "3px",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.35)",
  textAlign: "center" as const,
  margin: "0 0 24px",
};
const heading = { fontSize: "20px", color: "#ffffff", margin: "0 0 20px" };
const card = {
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "20px",
};
const label = {
  fontSize: "10px",
  color: "rgba(255,255,255,0.4)",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  margin: "0 0 2px",
};
const value = { fontSize: "14px", color: "#ffffff", margin: "0 0 14px" };
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" };
const footer = { fontSize: "12px", color: "rgba(255,255,255,0.3)", textAlign: "center" as const };
