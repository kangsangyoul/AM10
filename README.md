
# AuditMind IR Dashboard

## ✅ 사용 방법
1. 의존성 설치
```bash
npm install
```

2. 로컬 실행
```bash
npm run dev
```

   기본적으로 Vite 개발 서버가 `http://localhost:5173` 에서 실행됩니다.

3. 배포
- GitHub 저장소에 푸시하면 Vercel이 자동으로 배포합니다.
- 배포가 완료되면 `https://<YOUR_PROJECT>.vercel.app` 형식의 URL에서 접속할 수 있습니다.
- `vite` 기반 프로젝트입니다.

## 📁 구조
- `Dashboard.jsx`: 주요 UI (KPI, SVG, Heatmap, Table)
- `Sidebar.jsx`: 사이드바 구성
- `Topbar.jsx`: 상단 탭
