import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent, Properties } from '../modules/Properties';

@Injectable({
  providedIn: 'root'
})
export class AgentapiserviceService {
  baseUrl = 'https://mogarealstate.runasp.net/api'
  constructor(private http: HttpClient) { }
  getPropetiesByAgentId(agentId: number): Observable<Properties> {
    return this.http.get<Properties>(`${this.baseUrl}/Properties/ByAgent?agentId=${agentId}`);
  }
  getAgents() {
    return this.http.get<Agent[]>(`${this.baseUrl}/Agents`);
  }
  addAgent(agent: FormData) {
    return this.http.post<Agent>(`${this.baseUrl}/Agents`, agent);
  }
}
