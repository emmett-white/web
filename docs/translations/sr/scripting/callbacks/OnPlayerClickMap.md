---
title: OnPlayerClickMap
description: OnPlayerClickMap је позван када играч постави мету(target/waypoint) на pause menu мапи (десним кликом).
tags: ["player"]
---

:::warning

Ова функција је додата у SA-MP 0.3d и не ради у старијим верзијама1

:::

## Дескрипција

OnPlayerClickMap је позван када играч постави мету(target/waypoint) на pause menu мапи (десним кликом).

| Име      | Дескрипција                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| playerid | ID играча који је поставио мету(waypoint) на мапи                                      |
| Float:fX | X float координата где је играч кликнуо                                                |
| Float:fY | Y float координата где је играч кликнуо                                                |
| Float:fZ | Z float координата где је играч кликнуо (нетачно/непрецизно - погледај белешке испод) |

## Враћања

1 - Спречиће друге филтерскрипте да примају овај колбек.

0 - Означава да ће овај колбек бити прослеђен до следеће филтерскрипте.

Увек је позвана прва у филтерскрипти.

## Пример

```c
public OnPlayerClickMap(playerid, Float:fX, Float:fY, Float:fZ)
{
    SetPlayerPosFindZ(playerid, fX, fY, fZ);
    return 1;
}
```

## Белешке

:::tip

Како само име колбека каже, позива се само када играч кликне да означи мету(waypoint), а не када притисне типку. Повратна вредност Z ће бити 0 (нетачно) ако је место где је играч кликнуо много далеко од играча; Користи MapAndreas или ColAndreas plugin како би добио прецизнију Z координату.

:::

## Сродне функције