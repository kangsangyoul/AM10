
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

3. Vercel 자동 배포
- GitHub에 푸시하면 Vercel이 자동 배포합니다.
- `vite` 기반 프로젝트입니다.

## 📁 구조
- `Dashboard.jsx`: 주요 UI (KPI, SVG, Heatmap, Table)
- `Sidebar.jsx`: 사이드바 구성
- `Topbar.jsx`: 상단 탭

### ✨ 최근 변경 사항
- 대시보드가 1.5초 간격으로 자동 새로고침됩니다.
- 상단바에서 마지막 갱신 시간(0.1초 단위)을 표시합니다.
- 모든 사이드바 메뉴에 대응하는 페이지가 추가되었습니다.
