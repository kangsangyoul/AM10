
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
- 상단바에서 마지막 갱신 시간을 초 단위로 표시합니다.
- 사이드바 메뉴를 클릭해 활성 페이지를 전환할 수 있습니다.
- 대시보드 통계와 이벤트 로그가 1초마다 임의 값으로 갱신되어 실시간 시뮬레이션을 제공합니다.
- `InputData` 컴포넌트를 제거하고 자동 데이터 스트림 방식으로 변경했습니다.
