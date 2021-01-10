---
title: OnDialogResponse
description: Овај колбек се позива када играч одговори на дијалог који је позван ShowPlayerDialog функције било кликом дугмета, кликом ENTER/ESC типке или дуплим кликом на list item (уколико користите "list" стил дијалога).
tags: []
---

:::warning

Ова функција је додата у SA-MP 0.3a и не ради у старијим верзијама!

:::

## Дескрипција

Овај колбек се позива када играч одговори на дијалог који је позван ShowPlayerDialog функције било кликом дугмета, кликом ENTER/ESC типке или дуплим кликом на list item (уколико користите "list" стил дијалога).

| Име         | Дескрипција                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| playerid    | ИД играча који је одговорио на дијалог                                                                                                 |
| dialogid    | ИД дијалога на који је играч одговорио, приказан у ShowPlayerDialog-у                                                                  |
| response    | 1 за лево и 0 за десно дугме (ако је приказано само једно дугме онда је увек 1                                                         |
| listitem    | ИД list item-a који је селектован од стране играча (почиње од 0 само ако користите list style дијалог, у супротном ће бити -1)         |
| inputtext[] | Текст уписан у input box од стране играча текст селектованог list item-a                                                               |

## Позивања

Увек је позвана прва у филтерскрипти тако да return 1 ту блокира остале филтерскрипте да је виде.

## Примери

```c
// Дефинишемо дијалог како бисмо могли управљати њиме (одговорима итд.)
#define DIALOG_RULES 1

// У некој команди или негде другде, приказујемо тај дијалог помоћу већ споменуте функције ShowPlayerDialog
ShowPlayerDialog(playerid, DIALOG_RULES, DIALOG_STYLE_MSGBOX, "Правила сервера", "- Без читовања\n- Без спам-a\n- Поштујте админе\n\nДа ли прихватате правила?", "Да", "Не");

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[])
{
    if (dialogid == DIALOG_RULES)
    {
        if (response) // Ако играч кликне "Да" или притисне ENTER
        {
            SendClientMessage(playerid, COLOR_GREEN, "Прихватили сте правила сервера.");
        }
        
        else // Ако је играч кликне "Не" или ESC
        {
            Kick(playerid);
        }
        return 1; // Управљали смо дијалогом зато дајемо return 1, исто као и у OnPlayerCommandText.
    }

    return 0; // Овде мора бити return 0, као и у OnPlayerCommandText.
}

// Дефинишемо други дијалог (дајемо му већу вредност за 1 од претходног)
#define DIALOG_LOGIN 2

// У некој команди или негде другде, приказујемо тај дијалог помоћу већ споменуте функције ShowPlayerDialog
ShowPlayerDialog(playerid, DIALOG_LOGIN, DIALOG_STYLE_INPUT, "Пријављивање", "Молимо Вас унесите вашу тачну лозинку: ", "Пријави се", "Одустани");

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[])
{
    if (dialogid == DIALOG_LOGIN)
    {
        if (!response) // Ако играч кликне "Одустани" или ESC
        {
            Kick(playerid);
        }
        
        else // Ако играч кликне ENTER или "Пријави се"
        {
            if (CheckPassword(playerid, inputtext))
            {
                SendClientMessage(playerid, COLOR_RED, "Успешно сте се пријавили.");
            }
            
            else
            {
                SendClientMessage(playerid, COLOR_RED, "Погрешна лозинка.");

                // Поново приказујемо дијалог играчу
                ShowPlayerDialog(playerid, DIALOG_LOGIN, DIALOG_STYLE_INPUT, "Пријављивање", "Молимо Вас унесите вашу тачну лозинку: ", "Пријави се", "Одустани");
            }
        }
        return 1; // Управљали смо дијалогом зато дајемо return 1, исто као и у OnPlayerCommandText.
    }

    return 0; // Овде мора бити return 0, као и у OnPlayerCommandText.
}

// Дефинишемо трећи дијалог и опет му додељујемо вредност већу за 1 од претходног дијалога.
#define DIALOG_WEAPONS 3

// У некој команди или негде другде, приказујемо тај дијалог помоћу већ споменуте функције ShowPlayerDialog
ShowPlayerDialog(playerid, DIALOG_WEAPONS, DIALOG_STYLE_LIST, "Оружја", "Desert Eagle\nAK-47\nCombat Shotgun", "Одабери", "Одустани");

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[])
{
    if (dialogid == DIALOG_WEAPONS)
    {
        if (response) // Ако играч кликне "Одабери" или два пута кликне на list item
        {
            // Даје играчу оружје
            switch(listitem)
            {
                case 0: GivePlayerWeapon(playerid, WEAPON_DEAGLE, 14); // desert eagle
                case 1: GivePlayerWeapon(playerid, WEAPON_AK47, 120); // ak-47
                case 2: GivePlayerWeapon(playerid, WEAPON_SHOTGSPA, 28); // combat shotgun
            }
        }
        return 1; // Управљали смо дијалогом зато дајемо return 1, исто као и у OnPlayerCommandText.
    }

    return 0; // Овде мора бити return 0, као и у OnPlayerCommandText.
}

// Ово је други начин за приказивање и управљање дијалога број 3
#define DIALOG_WEAPONS 3

// У некој команди или негде другде, приказујемо тај дијалог помоћу већ споменуте функције ShowPlayerDialog
ShowPlayerDialog(playerid, DIALOG_WEAPONS, DIALOG_STYLE_LIST, 
    "Оружја",
    "Оружје\tМуниција\tЦена\nM4\t120\t500\nMP5\t90\t350\nAK-47\t120\t400",
    "Одабери", "Одустани"
);

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[])
{
    if (dialogid == DIALOG_WEAPONS)
    {
        if (response) // Ако играч кликне "Одабери" или два пута кликне на оружје
        {
            // Даје играчу оружје
            switch(listitem)
            {
                case 0: GivePlayerWeapon(playerid, WEAPON_M4, 120); // M4
                case 1: GivePlayerWeapon(playerid, WEAPON_MP5, 90); // МP5
                case 2: GivePlayerWeapon(playerid, WEAPON_AK47, 120); // AK-47
            }
        }
        return 1; // Управљали смо дијалогом зато дајемо return 1, исто као и у OnPlayerCommandText.
    }

    return 0; // Овде мора бити return 0, као и у OnPlayerCommandText.
}
```

## Белешке

:::tip

Параметри могу садржати различите вредности, базиране на стилу дијалога ([Кликни за више примера](../resources/dialogstyles.md)).

:::

:::tip

Прикладно је пребацити се кроз различите дијалоге, ако их имате много.

:::

:::warning

Дијалог играча се не сакрива када се gamemode рестартује, узрокујучи то да сервер принта "Warning: PlayerDialogResponse PlayerId: 0 dialog ID doesn't match last sent dialog ID" (Превод: PlayerDialogResponse PlayerId: 0 ИД дијалога се не поклапа са ИД-ем задње послатог дијалога) ако је играч одговорио на дијалог након рестарта.

:::

## Сродне функције

- [ShowPlayerDialog](../functions/ShowPlayerDialog.md): Прикажи дијалог играчу.
