import fs from "fs";
import path from "path";
import { Product, Campaign, LeadSubmission } from "@/types";
import { DEFAULT_PRODUCTS, DEFAULT_CAMPAIGNS } from "./default-data";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CAMPAIGNS_FILE = path.join(DATA_DIR, "campaigns.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

/**
 * Ensures data directory and JSON files exist
 */
function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "[]", "utf8");
  }
}

/**
 * Retrieve all products from JSON file or fallback
 */
export async function getJsonProducts(): Promise<Product[]> {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf8");
      return JSON.parse(data) as Product[];
    }
  } catch (err) {
    console.error("Error reading products.json:", err);
  }
  return DEFAULT_PRODUCTS;
}

/**
 * Retrieve all campaigns from JSON file or fallback
 */
export async function getJsonCampaigns(): Promise<Campaign[]> {
  try {
    if (fs.existsSync(CAMPAIGNS_FILE)) {
      const data = fs.readFileSync(CAMPAIGNS_FILE, "utf8");
      return JSON.parse(data) as Campaign[];
    }
  } catch (err) {
    console.error("Error reading campaigns.json:", err);
  }
  return DEFAULT_CAMPAIGNS;
}

/**
 * Store submitted lead locally in data/leads.json when MongoDB is not connected
 */
export async function saveJsonLead(leadData: LeadSubmission & { id?: string; createdAt?: string }): Promise<string> {
  try {
    ensureDataFiles();
    const leadId = leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const record = {
      id: leadId,
      ...leadData,
      createdAt: leadData.createdAt || new Date().toISOString(),
    };

    let existingLeads: Array<Record<string, unknown>> = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        const raw = fs.readFileSync(LEADS_FILE, "utf8");
        existingLeads = JSON.parse(raw || "[]");
      } catch {
        existingLeads = [];
      }
    }

    existingLeads.unshift(record);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads, null, 2), "utf8");
    return leadId;
  } catch (err) {
    console.error("Error saving lead to leads.json:", err);
    return `lead_${Date.now()}`;
  }
}

/**
 * Read all stored leads from JSON file
 */
export async function getJsonLeads(): Promise<Array<Record<string, unknown>>> {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf8");
      return JSON.parse(raw || "[]");
    }
  } catch (err) {
    console.error("Error reading leads.json:", err);
  }
  return [];
}
