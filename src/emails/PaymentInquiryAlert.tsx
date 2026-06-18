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
  phone?: string;
  paymentMethod: string;
  bikes: string;
  total: string;
  message?: string;
}

export default function PaymentInquiryAlert({
  name,
  email,
  phone,
  paymentMethod,
  bikes,
  total,
  message,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>SUR-RON Payment Inquiry from {name} — {paymentMethod}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={logo}>SURON</Heading>
          <Text style={sub}>Electric Bikes — New Order Inquiry</Text>
          <Hr style={hr} />

          <Heading style={heading}>New Payment Inquiry</Heading>

          {/* Customer details */}
          <Section style={card}>
            <Text style={cardTitle}>Customer Details</Text>

            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Phone</Text>
            <Text style={value}>{phone || "Not provided"}</Text>

            <Text style={label}>Payment Method</Text>
            <Text style={value}>{paymentMethod}</Text>
          </Section>

          {/* Order details */}
          <Section style={card}>
            <Text style={cardTitle}>Bikes Requested</Text>
            <Text style={value}>{bikes}</Text>
            <Hr style={{ ...hr, margin: "12px 0" }} />
            <Text style={label}>Order Total</Text>
            <Text style={totalText}>{total}</Text>
          </Section>

          {/* Optional message */}
          {message && (
            <Section style={card}>
              <Text style={cardTitle}>Customer Message</Text>
              <Text style={{ ...value, whiteSpace: "pre-wrap" }}>{message}</Text>
            </Section>
          )}

          <Hr style={hr} />
          <Text style={footer}>
            Reply directly to this email to contact {name} at {email}.
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
  marginBottom: "16px",
};
const cardTitle = {
  fontSize: "10px",
  color: "rgba(255,255,255,0.4)",
  textTransform: "uppercase" as const,
  letterSpacing: "3px",
  margin: "0 0 14px",
  fontWeight: "bold" as const,
};
const label = {
  fontSize: "10px",
  color: "rgba(255,255,255,0.35)",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  margin: "0 0 2px",
};
const value = { fontSize: "14px", color: "#ffffff", margin: "0 0 12px" };
const totalText = {
  fontSize: "28px",
  fontFamily: "Georgia, serif",
  fontWeight: "bold" as const,
  color: "#ffffff",
  margin: "4px 0 0",
};
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" };
const footer = { fontSize: "12px", color: "rgba(255,255,255,0.3)", textAlign: "center" as const };
