---
title: OnEnterExitModShop
description: Овај колбек се позива када играч уђе/изађе из mod shop-а.
tags: []
---

:::warning

Ова функција је додата у SA-MP 0.3a и не ради у старијим верзијама!

:::

## Дескрипција

Овај колбек се позива када играч уђе/изађе из mod shop-а.

| Име        | Дескрипција                                              |
| ---------- | -------------------------------------------------------- |
| playerid   | ИД играча који је ушао или изашао iz modshop-а           |
| enterexit  | 1 ако је играч ушао и 0 ако је изашао из modshop-а       |
| interiorid | ИД ентеријера modshopа у који играч улази (0 ако излази) |

## Враћања

Увек је позвана прва у филтерскрипти.

## Примери

```c
public OnEnterExitModShop(playerid, enterexit, interiorid)
{
    if (enterexit == 0) // Ако је enterexit 0, то значи да излазе из modshop-a
    {
        SendClientMessage(playerid, COLOR_WHITE, "Nice car! You have been taxed $100.");
        GivePlayerMoney(playerid, -100);
    }
    
    return 1;
}
```

## Белешке

:::warning

Познати буг(ови): Играчи се сударају кад уђу у исти modshop

:::

## Сродне функције

- [AddVehicleComponent](../functions/AddVehicleComponent.md): Додај компоненту на возило.
