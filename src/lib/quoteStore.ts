import { prisma } from "./prisma";

export type QuoteStatus = "pending" | "quoted" | "booked";

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  propertyType: string;
  message?: string;
  preferredDate?: string;
  createdAt: string;
  status: QuoteStatus;
  quotedAmountAud?: number;
}

export async function getQuotes(): Promise<QuoteRequest[]> {
  const rows = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((q) => ({
    id:              q.id,
    name:            q.name,
    email:           q.email,
    phone:           q.phone,
    service:         q.service,
    address:         q.address,
    propertyType:    q.propertyType,
    message:         q.message ?? undefined,
    preferredDate:   q.preferredDate ?? undefined,
    createdAt:       q.createdAt.toISOString(),
    status:          q.status as QuoteStatus,
    quotedAmountAud: q.quotedAmountAud ?? undefined,
  }));
}

export async function saveQuote(
  data: Omit<QuoteRequest, "id" | "createdAt" | "status">
): Promise<QuoteRequest> {
  const row = await prisma.quote.create({
    data: {
      name:          data.name,
      email:         data.email,
      phone:         data.phone,
      service:       data.service,
      address:       data.address,
      propertyType:  data.propertyType,
      message:       data.message,
      preferredDate: data.preferredDate,
      status:        "pending",
    },
  });
  return {
    id:            row.id,
    name:          row.name,
    email:         row.email,
    phone:         row.phone,
    service:       row.service,
    address:       row.address,
    propertyType:  row.propertyType,
    message:       row.message ?? undefined,
    preferredDate: row.preferredDate ?? undefined,
    createdAt:     row.createdAt.toISOString(),
    status:        row.status as QuoteStatus,
  };
}

export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus,
  quotedAmountAud?: number
): Promise<void> {
  await prisma.quote.update({
    where: { id },
    data:  {
      status,
      ...(quotedAmountAud !== undefined ? { quotedAmountAud } : {}),
    },
  });
}

/** Called when admin sends a quote offer. Stores the short reference code and expiry. */
export async function saveQuoteOffer(
  id: string,
  shortCode: string,
  quotedAmountAud: number,
  tokenExpiry: Date
): Promise<void> {
  await prisma.quote.update({
    where: { id },
    data:  { status: "quoted", quotedAmountAud, shortCode, tokenExpiry },
  });
}

/** Look up a quote by its short reference code (e.g. "EVR-AB1234"). */
export async function getQuoteByShortCode(shortCode: string) {
  return prisma.quote.findUnique({ where: { shortCode } });
}
