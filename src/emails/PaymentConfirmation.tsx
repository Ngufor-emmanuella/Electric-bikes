import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Hr,
} from "@react-email/components";

interface Props {
  name: string;
  paymentMethod: string;
  total: string;
}

export default function PaymentConfirmation({ name, paymentMethod, total }: Props) {
  return (
    <Html>
      <Head />
      <Preview>SUR-RON received your payment inquiry — we'll respond within 24 hours</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={logo}>SURON</Heading>
          <Text style={sub}>Electric Bikes</Text>
          <Hr style={hr} />

          <Heading style={heading}>Inquiry Received, {name}!</Heading>
          <Text style={paragraph}>
            We've received your <strong style={{ color: "#ffffff" }}>{paymentMethod}</strong> payment
            inquiry{total !== "N/A" ? ` for ${total}` : ""} and will be in touch within 24 hours with
            secure payment details and next steps.
          </Text>
          <Text style={paragraph}>
            If you have any urgent questions, please reply directly to this email.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            Warm regards,
            {"\n"}SUR-RON Electric Bikes Team
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
const heading = { fontSize: "20px", color: "#ffffff", margin: "0 0 16px" };
const paragraph = { fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: "22px", margin: "0 0 14px" };
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" };
const footer = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.3)",
  textAlign: "center" as const,
  whiteSpace: "pre-line" as const,
};
