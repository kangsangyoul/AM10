import React, { useState } from 'react';
import { Container, TextField, Button, Stack, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import api from './api';

const Policies = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [form, setForm] = useState({ id: '', path: '', key_version: 1 });

  const fetchPolicy = async (id: string) => {
    const res = await api.get(`/policies/${id}`);
    setPolicies([res.data]);
  };

  const save = async () => {
    await api.post('/policies', { ...form, enabled: true });
    fetchPolicy(form.id);
  };

  return (
    <Stack spacing={2} mt={2}>
      <h2>Policies</h2>
      <Stack direction="row" spacing={1}>
        <TextField label="ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
        <TextField label="Path" value={form.path} onChange={e => setForm({ ...form, path: e.target.value })} />
        <TextField label="Key Ver" type="number" value={form.key_version} onChange={e => setForm({ ...form, key_version: Number(e.target.value) })} />
        <Button onClick={save}>Save</Button>
        <Button onClick={() => fetchPolicy(form.id)}>Fetch</Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Enabled</TableCell>
            <TableCell>KeyVer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {policies.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.path}</TableCell>
              <TableCell>{String(p.enabled)}</TableCell>
              <TableCell>{p.key_version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

const Keys = () => {
  const [policyId, setPolicyId] = useState('');
  const [version, setVersion] = useState(1);
  const [keyHex, setKeyHex] = useState('');
  const [active, setActive] = useState<any | null>(null);

  const rollover = async () => {
    await api.post('/keys', { policy_id: policyId, version, key_hex: keyHex, state: 'ACTIVE' });
    await api.post('/policies', { id: policyId, path: '/secure_src', enabled: true, key_version: version });
  };
  const load = async () => {
    const res = await api.get('/keys/active', { params: { policy_id: policyId } });
    setActive(res.data);
  };

  return (
    <Stack spacing={2} mt={4}>
      <h2>Keys</h2>
      <Stack direction="row" spacing={1}>
        <TextField label="Policy" value={policyId} onChange={e => setPolicyId(e.target.value)} />
        <TextField label="Version" type="number" value={version} onChange={e => setVersion(Number(e.target.value))} />
        <TextField label="Key Hex" value={keyHex} onChange={e => setKeyHex(e.target.value)} />
        <Button onClick={rollover}>Rollover</Button>
        <Button onClick={load}>Active</Button>
      </Stack>
      {active && <div>Active version {active.version}</div>}
    </Stack>
  );
};

const Audits = () => {
  const [policyId, setPolicyId] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => {
    const res = await api.get('/audit', { params: { policy_id: policyId || undefined } });
    setRows(res.data);
  };
  return (
    <Stack spacing={2} mt={4}>
      <h2>Audits</h2>
      <Stack direction="row" spacing={1}>
        <TextField label="Policy" value={policyId} onChange={e => setPolicyId(e.target.value)} />
        <Button onClick={load}>Load</Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>TS</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell>Policy</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Op</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.ts}</TableCell>
              <TableCell>{r.agent_id}</TableCell>
              <TableCell>{r.policy_id}</TableCell>
              <TableCell>{r.path}</TableCell>
              <TableCell>{r.op}</TableCell>
              <TableCell>{r.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [input, setInput] = useState('');

  if (!token) {
    return (
      <Container sx={{ mt: 4 }}>
        <Stack direction="row" spacing={2}>
          <TextField label="Token" value={input} onChange={e => setInput(e.target.value)} />
          <Button onClick={() => { localStorage.setItem('token', input); setToken(input); }}>Save</Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Policies />
      <Keys />
      <Audits />
    </Container>
  );
};

export default App;
