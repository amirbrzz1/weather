export class IpInfoResponse {
  ip?: string;
  region?: string;
  country?: string;
  city?: string;
  loc?: string;
  org?: string;
  timezone?: string;
  readme?: string;

  get latitude(): number | undefined {
    return +(this.loc?.split(',')[0] ?? "0")
  }

  get longitude(): number | undefined {
    return +(this.loc?.split(',')[1] ?? "0")
  }
}
