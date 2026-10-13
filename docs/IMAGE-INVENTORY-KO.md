# 홈페이지 이미지 목록

기준 저장소 경로: `public/images/`. 브라우저에서 참조하는 경로는 `/images/<파일명>`입니다. 서버는 대소문자를 구분하므로 파일명과 확장자를 정확히 유지하세요. 파일은 모두 저장소의 기존 단일 이미지 폴더에 유지해 기존 페이지 경로가 바뀌지 않게 했습니다.

| 파일명 | 사용 페이지 / 위치 |
|---|---|
| `403-attic-rest.png` | 객실 403 · Inside 갤러리 · 다락 휴식 공간 |
| `403-attic-study.png` | 객실 403 · Inside 갤러리 · 다락 작업 공간 |
| `403-dining-lounge.png` | 객실 403 · Inside 갤러리 · 다이닝 라운지 |
| `403-hero.png` | 객실 403 대표 이미지, 홈 Two Spaces 슬라이더 |
| `403-living.png` | 객실 403 · Inside 갤러리 · 거실 |
| `403-pamplona.png` | 객실 403 · Inside 갤러리 · Pamplona 침실 |
| `404-attic.png` | 객실 404 · Inside 갤러리 · 다락 |
| `404-burgos-leon.png` | 객실 404 · Inside 갤러리 · Burgos / León 침실 |
| `404-dining-lounge.png` | 객실 404 · Inside 갤러리 · 다이닝 라운지 |
| `404-hero.png` | 객실 404 대표 이미지, 홈 Two Spaces 슬라이더, 문의 페이지 배경 |
| `404-living.png` | 객실 404 · Inside 갤러리 · 거실 |
| `404-santiago.png` | 객실 404 · Inside 갤러리 · Santiago 침실 |
| `building-205-dusk.jpg` | About 페이지 상단 대표 이미지 |
| `building-205-entrance.jpg` | Location 페이지 도착 동선 사진 · 3번 Building 205 출입구 |
| `building-205-street.jpg` | About 페이지 건물 사진, 홈 Two Spaces 슬라이더 |
| `campus-aerial.jpg` | 홈 위치 섹션, Location 페이지 상단 대표 이미지 |
| `campus-garden.jpg` | About 페이지 캠퍼스 정원 사진 |
| `campus-walkway.jpg` | About 페이지 캠퍼스 산책로 사진 |
| `identity-connect.jpg` | About 페이지 Identity · CONNECT |
| `identity-stay.jpg` | About 페이지 Identity · STAY |
| `identity-work.jpg` | About 페이지 Identity · WORK |
| `location-map.webp` | About 페이지 위치 안내 지도 |
| `parking-204-entrance.jpg` | Location 페이지 도착 동선 사진 · 1번 주차장 입구 |
| `site-map.png` | Location 페이지 주차 안내 배치도 |
| `th212-sign.jpg` | Location 페이지 도착 동선 사진 · 2번 TH212 표지 |

## 이미지 교체

1. VS Code Explorer에서 `public/images/`를 엽니다.
2. 교체할 파일과 **동일한 파일명·확장자**로 새 이미지를 덮어씁니다. 예: `403-hero.png`.
3. 저장 후 로컬 개발 화면을 새로고침합니다. 기존 이미지가 남아 보이면 강력 새로고침(Ctrl+F5)을 합니다.
4. GitHub Pages 또는 FTP/SFTP에도 새 파일과 새 빌드 결과를 배포합니다. 정적 빌드는 `out/images/`에 사용 이미지를 포함하므로 파일을 교체한 뒤 반드시 다시 빌드해야 합니다.
5. 파일명을 바꾸려면 `src/content/rooms.ts`, `src/content/site.ts`, `src/content/highlights.ts`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/location/page.tsx`에서 같은 `/images/기존파일명` 참조를 모두 바꾸고 링크를 확인합니다.

파일명에 공백·한글을 넣지 말고, JPG/PNG 확장자를 정확히 보존하세요. 원본 이미지는 변경 전 별도 백업을 보관하는 것을 권장합니다.
