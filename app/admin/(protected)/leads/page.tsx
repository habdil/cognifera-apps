import { getSql } from "@/lib/neon";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  layanan_interest: string | null;
  message: string;
  status: string;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminLeadsPage() {
  const sql = getSql();
  const leads = (await sql`
    SELECT id, name, email, layanan_interest, message, status, created_at
    FROM contact_leads
    ORDER BY created_at DESC
    LIMIT 200;
  `) as LeadRow[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Leads</h1>
        <p className="text-sm text-gray-500 mt-1">
          {leads.length} pesan dari form konsultasi
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="border border-gray-200 bg-white py-20 text-center">
          <p className="text-sm text-gray-400">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white border border-gray-200 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-gray-950">{lead.name}</p>
                  <p className="text-xs text-gray-500">
                    <a href={`mailto:${lead.email}`} className="hover:text-primary">
                      {lead.email}
                    </a>
                    {lead.layanan_interest && (
                      <span className="ml-2 uppercase tracking-wide text-primary">
                        {lead.layanan_interest}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400">{formatDate(lead.created_at)}</span>
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
