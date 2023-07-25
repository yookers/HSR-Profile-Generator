// Design Iteration #1
// @Yookers

const fs = require('fs');
const { join } = require('path');
const express = require('express')
const app = express()
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const Vibrant = require('node-vibrant');

// Set 'true' to enable local debug mode
const LOCAL_DEBUG = false;

// Register the 'Inter' font
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'Inter-Regular.ttf'), 'Inter-Regular');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'Inter-Medium.ttf'), 'Inter-Medium');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'Inter-SemiBold.ttf'), 'Inter-SemiBold');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'Inter-Bold.ttf'), 'Inter-Bold');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'Inter-ExtraBold.ttf'), 'Inter-ExtraBold');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'NotoSansJP-Bold.ttf'), 'NotoSansJP-Bold');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'NotoSansKR-Bold.ttf'), 'NotoSansKR-Bold');
GlobalFonts.registerFromPath(join(__dirname, 'fonts', 'NotoSansSC-Bold.otf'), 'NotoSansSC-Bold');

const FONT_FAMILY = 'Inter, Noto Sans SC, Noto Sans JP, sans-serif';
const FONT_MEDIUM = '500';
const FONT_SEMIBOLD = '600';
const FONT_BOLD = '700';
const FONT_EXTRA_BOLD = '800';
const FONT_SIZE_WATERMARK = '16px'
const FONT_SIZE_SMALLEST = '20px';
const FONT_SIZE_SMALLER = '24px';
const FONT_SIZE_NORMAL = '32px';
const FONT_SIZE_BIG = '48px';
const FONT_SIZE_BIGGEST = '96px';
const FONT_LINE_HEIGHT = 25;

// Magical numbers :3
const RELIC_LEFT_ITEM_TL_X = 83;
const RELIC_LEFT_ITEM_TL_Y = 204;
const RELIC_RIGHT_ITEM_TL_X = 555;
const RELIC_RIGHT_ITEM_TL_Y = RELIC_LEFT_ITEM_TL_Y;
const RELIC_ITEM_DIMENSIONS = 128;
// Relic stat name text position (left aligned)
const RELIC_LEFT_STAT_NAME_TL_X = 233;
const RELIC_LEFT_STAT_NAME_TL_Y = 213;
const RELIC_RIGHT_STAT_NAME_TL_X = 705;
const RELIC_RIGHT_STAT_NAME_TL_Y = 213;
// Relic main stat highlight bar dimensions and position
const RELIC_STAT_BAR_WIDTH = 254;
const RELIC_STAT_BAR_HEIGHT = 26;
const RELIC_LEFT_STAT_BAR_TL_X = RELIC_LEFT_STAT_NAME_TL_X - 4;
const RELIC_LEFT_STAT_BAR_TL_Y = RELIC_LEFT_STAT_NAME_TL_Y - 5;
const RELIC_RIGHT_STAT_BAR_TL_X = RELIC_RIGHT_STAT_NAME_TL_X - 4;
const RELIC_RIGHT_STAT_BAR_TL_Y = RELIC_RIGHT_STAT_NAME_TL_Y - 5;
// Relic stat value text position (right aligned)
const RELIC_LEFT_STAT_VALUE_TL_X = 479;
const RELIC_LEFT_STAT_VALUE_TL_Y = RELIC_LEFT_STAT_NAME_TL_Y;
const RELIC_RIGHT_STAT_VALUE_TL_X = 951;
const RELIC_RIGHT_STAT_VALUE_TL_Y = RELIC_RIGHT_STAT_NAME_TL_Y;
// Relic level tag dimensions and position
const RELIC_TAG_WIDTH = 64;
const RELIC_TAG_HEIGHT = 28;
const RELIC_LEFT_TAG_TL_X = RELIC_LEFT_ITEM_TL_X;
const RELIC_LEFT_TAG_TL_Y = RELIC_LEFT_ITEM_TL_Y;
const RELIC_RIGHT_TAG_TL_X = RELIC_RIGHT_ITEM_TL_X;
const RELIC_RIGHT_TAG_TL_Y = RELIC_RIGHT_ITEM_TL_Y;
// Relic level tag text position (centered)
const RELIC_LEFT_TAG_TEXT_TL_X = RELIC_LEFT_ITEM_TL_X + 32;
const RELIC_LEFT_TAG_TEXT_TL_Y = RELIC_LEFT_ITEM_TL_Y + 5;
const RELIC_RIGHT_TAG_TEXT_TL_X = RELIC_RIGHT_ITEM_TL_X + 32;
const RELIC_RIGHT_TAG_TEXT_TL_Y = RELIC_RIGHT_ITEM_TL_Y + 5;
// Relic separator
const RELIC_HEIGHT_PADDING = 170;
const RELIC_STAT_LINE_HEIGHT = 25;

// Skill dimensions and position
const SKILL_ITEM_TL_X = 555;
const SKILL_ITEM_TL_Y = 733;
const SKILL_ITEM_DIMENSIONS = 96;
// Skill tag dimensions and position
const SKILL_TAG_WIDTH = 48;
const SKILL_TAG_HEIGHT = 28;
const SKILL_TAG_TL_X = SKILL_ITEM_TL_X;
const SKILL_TAG_TL_Y = SKILL_ITEM_TL_Y;
// Skill tag text position (centered)
const SKILL_TAG_TEXT_TL_X = SKILL_ITEM_TL_X + 24;
const SKILL_TAG_TEXT_TL_Y = SKILL_ITEM_TL_Y + 5;
// Skill description text position (left aligned)
const SKILL_DESC_TL_X = SKILL_ITEM_TL_X;
const SKILL_DESC_TL_Y = 842;
// Skill separator
const SKILL_WIDTH_PADDING = 100;

// Character art window dimensions and position
const CHARACTER_ART_TL_X = 1027;
const CHARACTER_ART_TL_Y = 204;
const CHARACTER_ART_WIDTH = 490;
const CHARACTER_ART_HEIGHT = 312;
const CHARACTER_ART_SCALE_RATIO = 0.8;
const CHARACTER_ART_CROP_X_OFFSET = 0;
const CHARACTER_ART_CROP_Y_OFFSET = 10;
// Character eidolon tag dimensions and position
const CHARACTER_EIDOLON_TAG_TL_X = CHARACTER_ART_TL_X;
const CHARACTER_EIDOLON_TAG_TL_Y = CHARACTER_ART_TL_Y;
const CHARACTER_EIDOLON_TAG_WIDTH = 64;
const CHARACTER_EIDOLON_TAG_HEIGHT = 28;
// Character eidolon tag text position (centered)
const CHARACTER_EIDOLON_TAG_TEXT_TL_X = CHARACTER_EIDOLON_TAG_TL_X + 32;
const CHARACTER_EIDOLON_TAG_TEXT_TL_Y = CHARACTER_EIDOLON_TAG_TL_Y + 5;
// Character name text position (right aligned)
const CHARACTER_NAME_TL_X = 1517;
const CHARACTER_NAME_TL_Y = 145;
// Character path and element position
const CHARACTER_ELEMENT_TL_X = 1430;
const CHARACTER_ELEMENT_TL_Y = 226;
const CHARACTER_PATH_TL_X = 1430;
const CHARACTER_PATH_TL_Y = 318;
const CHARACTER_ELEMENT_DIMENSIONS = 80;
const CHARACTER_PATH_DIMENSIONS = 80;
// Character level highlight bar
const CHARACTER_LEVEL_BAR_TL_X = 1023;
const CHARACTER_LEVEL_BAR_TL_Y = 520;
const CHARACTER_LEVEL_BAR_WIDTH = 498;
const CHARACTER_LEVEL_BAR_HEIGHT = 32;
// Character level text position (number is right aligned)
const CHARACTER_LEVEL_TEXT_TL_X = 1035;
const CHARACTER_LEVEL_TEXT_TL_Y = 526;
const CHARACTER_LEVEL_VALUE_TL_X = 1509;
const CHARACTER_LEVEL_VALUE_TL_Y = CHARACTER_LEVEL_TEXT_TL_Y;

// Character stat icon dimensions and position
const CHARACTER_STAT_ICON_TL_X = 1017;
const CHARACTER_STAT_ICON_TL_Y = 553;
const CHARACTER_STAT_ICON_DIMENSIONS = 32;
const CHARACTER_STAT_ICON_HEIGHT_PADDING = 25;

// Character stat name total position
const CHARACTER_STAT_NAME_TL_X = 1057;
const CHARACTER_STAT_NAME_TL_Y = 561;
// Character stat value total position (right aligned)
const CHARACTER_STAT_VALUE_TL_X = 1517;
const CHARACTER_STAT_VALUE_TL_Y = CHARACTER_STAT_NAME_TL_Y;
// Character stat separator
const CHARACTER_STAT_LINE_HEIGHT = 25;

// Player name text position (left aligned)
const PLAYER_NAME_TL_X = 83;
const PLAYER_NAME_TL_Y = 75;
// Background dimensions and bottom bar position
const BACKGROUND_BORDER_SIZE = 16;
const BACKGROUND_BOTTOM_BAR_HEIGHT = 74;
const BACKGROUND_BOTTOM_BAR_TL_Y = 1000 - BACKGROUND_BOTTOM_BAR_HEIGHT;
// Bottom bar text info position (uid, level, achievements)
const UID_TL_X = 60;
const UID_TL_Y = BACKGROUND_BOTTOM_BAR_TL_Y + 25;
// Level and achievements text position (right aligned)
const LEVEL_TL_X = 1530;
const LEVEL_TL_Y = UID_TL_Y;
// Watermark text position (left aligned), 
const WATERMARK_TL_X = 93;
const WATERMARK_TL_Y = 868;
const WATERMARK_LINE_HEIGHT = 20;


const ASSETS_BASE_URL = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
const API_BASE_URL_PREPEND = 'https://api.mihomo.me/sr_info_parsed/';
const API_BASE_URL_APPEND = '?lang=en&version=v2';

const canvas = createCanvas(1600, 1000)
const ctx = canvas.getContext('2d')

// Easier formatting
ctx.textBaseline = 'hanging';

async function drawBackground(primaryColor, secondaryColor) {
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw inner border
    ctx.fillStyle = secondaryColor;
    ctx.fillRect(0, 0, canvas.width, BACKGROUND_BORDER_SIZE);
    ctx.fillRect(0, 0, BACKGROUND_BORDER_SIZE, canvas.height);
    ctx.fillRect(0, canvas.height - BACKGROUND_BORDER_SIZE, canvas.width, BACKGROUND_BORDER_SIZE);
    ctx.fillRect(canvas.width - BACKGROUND_BORDER_SIZE, 0, BACKGROUND_BORDER_SIZE, canvas.height);

    // Bottom bar
    ctx.fillRect(0, BACKGROUND_BOTTOM_BAR_TL_Y, canvas.width, BACKGROUND_BOTTOM_BAR_HEIGHT);
}

async function drawHeader(name, secondaryColor) {
    ctx.font = `${FONT_BOLD} ${FONT_SIZE_BIGGEST} ${FONT_FAMILY}`;
    ctx.fillStyle = secondaryColor;
    // Remove HTML tags
    name = name.replace(/<\/?[^>]+(>|$)/g, "");
    ctx.fillText(`${name}`, PLAYER_NAME_TL_X, PLAYER_NAME_TL_Y);
}

async function drawCharacterSkills(characterSkillsData, primaryColor, secondaryColor) {
    const skillText = ['Basic', 'Talent', 'Skill', 'Ultimate'];
    // Loop through each skill
    for (let i = 0; i < 4; i++) {
        //ctx.fillRect(SKILL_ITEM_TL_X + SKILL_WIDTH_PADDING * i, SKILL_ITEM_TL_Y, SKILL_ITEM_DIMENSIONS, SKILL_ITEM_DIMENSIONS);
        // Picture from URL
        const skillIconURL = characterSkillsData[`character_${skillText[i]}_icon_url`];
        const skillIcon = await colorImage(`${ASSETS_BASE_URL}${skillIconURL}`, secondaryColor);
        ctx.drawImage(skillIcon, SKILL_ITEM_TL_X + SKILL_WIDTH_PADDING * i, SKILL_ITEM_TL_Y, SKILL_ITEM_DIMENSIONS, SKILL_ITEM_DIMENSIONS);
        // Skill tag
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(SKILL_TAG_TL_X + SKILL_WIDTH_PADDING * i, SKILL_TAG_TL_Y, SKILL_TAG_WIDTH, SKILL_TAG_HEIGHT);
        // Skill description
        ctx.font = `${FONT_SEMIBOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
        ctx.textAlign = 'left';
        ctx.fillText(`${skillText[i]}`, SKILL_DESC_TL_X + SKILL_WIDTH_PADDING * i, SKILL_DESC_TL_Y);
        // Skill tag text
        ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLER} ${FONT_FAMILY}`;
        ctx.fillStyle = primaryColor;
        ctx.textAlign = 'center';
        const skillLevel = prependZero(characterSkillsData[`character_${skillText[i]}_level`]);
        ctx.fillText(`${skillLevel}`, SKILL_TAG_TEXT_TL_X + SKILL_WIDTH_PADDING * i, SKILL_TAG_TEXT_TL_Y);
    }
    ctx.textAlign = 'left';
}

async function drawCharacterWindow(characterData, primaryColor, secondaryColor) {
    // Draw 4px border outside
    ctx.fillStyle = secondaryColor;
    ctx.fillRect(CHARACTER_ART_TL_X - 4, CHARACTER_ART_TL_Y - 4, CHARACTER_ART_WIDTH + 8, CHARACTER_ART_HEIGHT + 8);
    // Character picture
    const characterPicture = await cropImage(characterData.character_icon_url, CHARACTER_ART_WIDTH, CHARACTER_ART_HEIGHT, CHARACTER_ART_SCALE_RATIO, CHARACTER_ART_CROP_X_OFFSET, CHARACTER_ART_CROP_Y_OFFSET);
    ctx.drawImage(characterPicture, CHARACTER_ART_TL_X, CHARACTER_ART_TL_Y, CHARACTER_ART_WIDTH, CHARACTER_ART_HEIGHT);
    // Character path and element
    ctx.drawImage(await colorImage(`${ASSETS_BASE_URL}${characterData.character_path_icon_url}`, primaryColor), CHARACTER_PATH_TL_X, CHARACTER_PATH_TL_Y, CHARACTER_PATH_DIMENSIONS, CHARACTER_PATH_DIMENSIONS);
    ctx.drawImage(await colorImage(`${ASSETS_BASE_URL}${characterData.character_element_icon_url}`, primaryColor), CHARACTER_ELEMENT_TL_X, CHARACTER_ELEMENT_TL_Y, CHARACTER_ELEMENT_DIMENSIONS, CHARACTER_ELEMENT_DIMENSIONS);
    // Character name
    ctx.font = `${FONT_BOLD} ${FONT_SIZE_BIG} ${FONT_FAMILY}`;
    ctx.fillStyle = secondaryColor;
    ctx.textAlign = 'right';
    // Remove HTML tags
    const characterName = characterData.character_name.replace(/<\/?[^>]+(>|$)/g, "");
    ctx.fillText(`${characterName}`, CHARACTER_NAME_TL_X, CHARACTER_NAME_TL_Y);
    ctx.textAlign = 'left';
    // Character eidolon tag
    ctx.fillRect(CHARACTER_EIDOLON_TAG_TL_X, CHARACTER_EIDOLON_TAG_TL_Y, CHARACTER_EIDOLON_TAG_WIDTH, CHARACTER_EIDOLON_TAG_HEIGHT);
    // Character eidolon tag text
    ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLER} ${FONT_FAMILY}`;
    ctx.fillStyle = primaryColor;
    ctx.textAlign = 'center';
    ctx.fillText(`E${characterData.character_rank}`, CHARACTER_EIDOLON_TAG_TEXT_TL_X, CHARACTER_EIDOLON_TAG_TEXT_TL_Y);
    ctx.textAlign = 'left';
    // Character level highlight box
    ctx.fillStyle = secondaryColor;
    ctx.fillRect(CHARACTER_LEVEL_BAR_TL_X, CHARACTER_LEVEL_BAR_TL_Y, CHARACTER_LEVEL_BAR_WIDTH, CHARACTER_LEVEL_BAR_HEIGHT);
    // Character level text
    ctx.fillStyle = primaryColor;
    ctx.textAlign = 'left';
    ctx.fillText('Level', CHARACTER_LEVEL_TEXT_TL_X, CHARACTER_LEVEL_TEXT_TL_Y);
    ctx.textAlign = 'right';
    ctx.fillText(`${characterData.character_level}`, CHARACTER_LEVEL_VALUE_TL_X, CHARACTER_LEVEL_VALUE_TL_Y);

    ctx.textAlign = 'left';
}

async function drawCharacterStats(characterAttributesData, characterAdditionsData, secondaryColor) {
    ctx.font = `${FONT_SEMIBOLD} ${FONT_SIZE_SMALLER} ${FONT_FAMILY}`;
    ctx.fillStyle = secondaryColor;

    // Character base stat names
    ctx.fillText('HP', CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y);
    ctx.fillText('ATK', CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y + CHARACTER_STAT_LINE_HEIGHT);
    ctx.fillText('DEF', CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y + CHARACTER_STAT_LINE_HEIGHT * 2);
    ctx.fillText('SPD', CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y + CHARACTER_STAT_LINE_HEIGHT * 3);
    ctx.fillText('CRIT Rate', CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y + CHARACTER_STAT_LINE_HEIGHT * 4);
    ctx.fillText('CRIT DMG', CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y + CHARACTER_STAT_LINE_HEIGHT * 5);

    // Character base stat values (right aligned)
    ctx.textAlign = 'right';
    // Add base values with character additions if it exists
    const baseHP = addBaseValue(characterAdditionsData, characterAttributesData.attributes_base_hp, 'HP');
    const baseATK = addBaseValue(characterAdditionsData, characterAttributesData.attributes_base_atk, 'ATK');
    const baseDEF = addBaseValue(characterAdditionsData, characterAttributesData.attributes_base_def, 'DEF');
    const baseSPD = addBaseValue(characterAdditionsData, characterAttributesData.attributes_base_spd, 'SPD');
    const baseCritRate = addBaseValueFloat(characterAdditionsData, characterAttributesData.attributes_base_crit_rate, 'CRIT Rate');
    const baseCritDMG = addBaseValueFloat(characterAdditionsData, characterAttributesData.attributes_base_crit_dmg, 'CRIT DMG');
    // Draw character base stat values and their stat icons
    const baseStats = [baseHP, baseATK, baseDEF, baseSPD, baseCritRate, baseCritDMG];
    const baseStatsName = ['base_hp', 'base_atk', 'base_def', 'base_spd', 'base_crit_rate', 'base_crit_dmg'];
    for (const [index, stat] of baseStats.entries()) {
        // Special case for crit rate and crit dmg as they are percentages
        ctx.fillText(`${stat}${index > 3 ? '%' : ''}`, CHARACTER_STAT_VALUE_TL_X, CHARACTER_STAT_VALUE_TL_Y + CHARACTER_STAT_LINE_HEIGHT * index);
        // Draw stat icon
        const baseStatIconURL = `attributes_${baseStatsName[index]}_icon`;
        const baseStatIcon = await colorImage(`${ASSETS_BASE_URL}${characterAttributesData[baseStatIconURL]}`, secondaryColor);
        ctx.drawImage(baseStatIcon, CHARACTER_STAT_ICON_TL_X, CHARACTER_STAT_ICON_TL_Y + CHARACTER_STAT_LINE_HEIGHT * index, CHARACTER_STAT_ICON_DIMENSIONS, CHARACTER_STAT_ICON_DIMENSIONS);
    }
    // Loop through the rest of character additions and draw name and display value
    let i = 0;
    for (const [_, value] of Object.entries(characterAdditionsData)) {
        ctx.textAlign = 'left';
        ctx.fillText(`${value.name}`, CHARACTER_STAT_NAME_TL_X, CHARACTER_STAT_NAME_TL_Y + CHARACTER_STAT_LINE_HEIGHT * (6 + i));
        ctx.textAlign = 'right';
        // Special case for energy regen rate as the base is 100%
        if (value.name === 'Energy Regeneration Rate') {
            const energyRegenRate = parseFloat(value.display) + 100;
            ctx.fillText(`${energyRegenRate}%`, CHARACTER_STAT_VALUE_TL_X, CHARACTER_STAT_VALUE_TL_Y + CHARACTER_STAT_LINE_HEIGHT * (6 + i));
        } else {
            ctx.fillText(`${value.display}`, CHARACTER_STAT_VALUE_TL_X, CHARACTER_STAT_VALUE_TL_Y + CHARACTER_STAT_LINE_HEIGHT * (6 + i));
        }
        // Draw addition stat icon
        const statIcon = await colorImage(`${ASSETS_BASE_URL}${value.icon}`, secondaryColor);
        ctx.drawImage(statIcon, CHARACTER_STAT_ICON_TL_X, CHARACTER_STAT_ICON_TL_Y + CHARACTER_STAT_LINE_HEIGHT * (6 + i), CHARACTER_STAT_ICON_DIMENSIONS, CHARACTER_STAT_ICON_DIMENSIONS);
        i++;
    }
    ctx.textAlign = 'left';
}

async function drawRelics(relicsData, lightconeData, primaryColor, secondaryColor) {
    // Left side, loop to draw 4 relics with height padding
    for (let i = 0; i < 4; i++) {
        // Draw 4px border outside relic box
        ctx.strokeStyle = secondaryColor;
        ctx.fillRect(RELIC_LEFT_ITEM_TL_X - 4, RELIC_LEFT_ITEM_TL_Y - 4 + (i * RELIC_HEIGHT_PADDING), RELIC_ITEM_DIMENSIONS + 8, RELIC_ITEM_DIMENSIONS + 8);
        // Relic item box
        ctx.fillStyle = primaryColor;
        ctx.fillRect(RELIC_LEFT_ITEM_TL_X, RELIC_LEFT_ITEM_TL_Y + (i * RELIC_HEIGHT_PADDING), RELIC_ITEM_DIMENSIONS, RELIC_ITEM_DIMENSIONS);
        try {
            // Picture from URL
            const relicImage = await loadImage(`${ASSETS_BASE_URL}${relicsData[i].icon_url}`);
            // Resize to 96px
            ctx.drawImage(relicImage, RELIC_LEFT_ITEM_TL_X + 16, RELIC_LEFT_ITEM_TL_Y + 16 + (i * RELIC_HEIGHT_PADDING), 96, 96);
            // Relic box tag
            ctx.fillStyle = secondaryColor;
            ctx.fillRect(RELIC_LEFT_TAG_TL_X, RELIC_LEFT_TAG_TL_Y + (i * RELIC_HEIGHT_PADDING), RELIC_TAG_WIDTH, RELIC_TAG_HEIGHT);
            // Draw relic stats
            await drawRelicStats(relicsData[i], i, 'left', primaryColor, secondaryColor);
        }
        catch {
            console.log(`Relic ${i + 1} not found.`);
        }
    }

    // Right side, loop to draw 1 lc + 2 relics with height padding
    await drawLightCone(lightconeData, primaryColor, secondaryColor);
    for (let i = 1; i < 3; i++) {
        // Draw 4px border outside relic box
        ctx.strokeStyle = secondaryColor;
        ctx.fillRect(RELIC_RIGHT_ITEM_TL_X - 4, RELIC_RIGHT_ITEM_TL_Y - 4 + (i * RELIC_HEIGHT_PADDING), RELIC_ITEM_DIMENSIONS + 8, RELIC_ITEM_DIMENSIONS + 8);
        // Relic item box
        ctx.fillStyle = primaryColor;
        ctx.fillRect(RELIC_RIGHT_ITEM_TL_X, RELIC_RIGHT_ITEM_TL_Y + (i * RELIC_HEIGHT_PADDING), 128, 128);

        try {
            // Picture from URL
            const relicImage = await loadImage(`${ASSETS_BASE_URL}${relicsData[i + 3].icon_url}`);
            // Resize to 96px
            ctx.drawImage(relicImage, RELIC_RIGHT_ITEM_TL_X + 16, RELIC_RIGHT_ITEM_TL_Y + 16 + (i * RELIC_HEIGHT_PADDING), 96, 96);
            // Relic box tag
            ctx.fillStyle = secondaryColor;
            ctx.fillRect(RELIC_RIGHT_TAG_TL_X, RELIC_RIGHT_TAG_TL_Y + (i * RELIC_HEIGHT_PADDING), RELIC_TAG_WIDTH, RELIC_TAG_HEIGHT);
            // Draw relic stats
            await drawRelicStats(relicsData[i + 3], i, 'right', primaryColor, secondaryColor);
        }
        catch {
            console.log(`Relic ${i + 4} not found.`);
        }
    }
}

async function drawRelicStats(relicData, i, side, primaryColor, secondaryColor) {
    try {
        if (side === 'left') {
            // Relic main stat hightlight box
            ctx.fillStyle = secondaryColor;
            ctx.fillRect(RELIC_LEFT_STAT_BAR_TL_X, RELIC_LEFT_STAT_BAR_TL_Y + (i * RELIC_HEIGHT_PADDING), RELIC_STAT_BAR_WIDTH, RELIC_STAT_BAR_HEIGHT);

            // Relic tag text
            ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLER} ${FONT_FAMILY}`;
            ctx.fillStyle = primaryColor;
            ctx.textAlign = 'center';
            const relicLevel = prependZero(relicData.level);
            ctx.fillText(`+${relicLevel}`, RELIC_LEFT_TAG_TEXT_TL_X, RELIC_LEFT_TAG_TEXT_TL_Y + (i * RELIC_HEIGHT_PADDING));

            // Relic main stat name
            ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
            ctx.fillStyle = primaryColor;
            ctx.textAlign = 'left';
            ctx.fillText(`${relicData.main_affix.name}`, RELIC_LEFT_STAT_NAME_TL_X, RELIC_LEFT_STAT_NAME_TL_Y + (i * RELIC_HEIGHT_PADDING));
            // Relic main stat value
            ctx.textAlign = 'right';
            ctx.fillText(`${relicData.main_affix.display}`, RELIC_LEFT_STAT_VALUE_TL_X, RELIC_LEFT_STAT_VALUE_TL_Y + (i * RELIC_HEIGHT_PADDING));
            // Draw every sub stat
            ctx.font = `${FONT_SEMIBOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
            ctx.fillStyle = secondaryColor;
            for (let j = 0; j < relicData.sub_affix.length; j++) {
                ctx.textAlign = 'left';
                ctx.fillText(`${relicData.sub_affix[j].name}`, RELIC_LEFT_STAT_NAME_TL_X, RELIC_LEFT_STAT_NAME_TL_Y + (i * RELIC_HEIGHT_PADDING) + RELIC_STAT_LINE_HEIGHT * (j + 1));
                ctx.textAlign = 'right';
                ctx.fillText(`${relicData.sub_affix[j].display}`, RELIC_LEFT_STAT_VALUE_TL_X, RELIC_LEFT_STAT_VALUE_TL_Y + (i * RELIC_HEIGHT_PADDING) + RELIC_STAT_LINE_HEIGHT * (j + 1));
            }
        }
        if (side === 'right') {
            // Relic main stat hightlight box
            ctx.fillStyle = secondaryColor;
            ctx.fillRect(RELIC_RIGHT_STAT_BAR_TL_X, RELIC_RIGHT_STAT_BAR_TL_Y + (i * RELIC_HEIGHT_PADDING), RELIC_STAT_BAR_WIDTH, RELIC_STAT_BAR_HEIGHT);

            // Relic tag text
            ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLER} ${FONT_FAMILY}`;
            ctx.fillStyle = primaryColor;
            ctx.textAlign = 'center';
            const relicLevel = prependZero(relicData.level);
            ctx.fillText(`+${relicLevel}`, RELIC_RIGHT_TAG_TEXT_TL_X, RELIC_RIGHT_TAG_TEXT_TL_Y + (i * RELIC_HEIGHT_PADDING));

            // Relic main stat name
            ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
            ctx.fillStyle = primaryColor;
            ctx.textAlign = 'left';
            ctx.fillText(`${relicData.main_affix.name}`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y + (i * RELIC_HEIGHT_PADDING));
            // Relic main stat value
            ctx.textAlign = 'right';
            ctx.fillText(`${relicData.main_affix.display}`, RELIC_RIGHT_STAT_VALUE_TL_X, RELIC_RIGHT_STAT_VALUE_TL_Y + (i * RELIC_HEIGHT_PADDING));
            // Draw every sub stat
            ctx.font = `${FONT_SEMIBOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
            ctx.fillStyle = secondaryColor;
            for (let j = 0; j < relicData.sub_affix.length; j++) {
                ctx.textAlign = 'left';
                ctx.fillText(`${relicData.sub_affix[j].name}`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y + (i * RELIC_HEIGHT_PADDING) + RELIC_STAT_LINE_HEIGHT * (j + 1));
                ctx.textAlign = 'right';
                ctx.fillText(`${relicData.sub_affix[j].display}`, RELIC_RIGHT_STAT_VALUE_TL_X, RELIC_RIGHT_STAT_VALUE_TL_Y + (i * RELIC_HEIGHT_PADDING) + RELIC_STAT_LINE_HEIGHT * (j + 1));
            }
        }
    } catch (error) {
        console.error('Error drawing relic occured:', error);
    }
    ctx.textAlign = 'left';
}

async function drawLightCone(lightConeData, primaryColor, secondaryColor) {
    // Draw 4px border outside lightcone box
    ctx.fillStyle = secondaryColor;
    ctx.fillRect(RELIC_RIGHT_ITEM_TL_X - 4, RELIC_RIGHT_ITEM_TL_Y - 4, RELIC_ITEM_DIMENSIONS + 8, RELIC_ITEM_DIMENSIONS + 8);
    // Lightcone item box
    ctx.fillStyle = primaryColor;
    ctx.fillRect(RELIC_RIGHT_ITEM_TL_X, RELIC_RIGHT_ITEM_TL_Y, 128, 128);
    try {
        // Picture from URL
        const lightConeImage = await loadImage(`${ASSETS_BASE_URL}${lightConeData.lightcone_preview_url}`);
        // Resize to 112px
        ctx.drawImage(lightConeImage, RELIC_RIGHT_ITEM_TL_X + 8, RELIC_RIGHT_ITEM_TL_Y + 8, 112, 112);
        // Lightcone box tag
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(RELIC_RIGHT_TAG_TL_X, RELIC_RIGHT_TAG_TL_Y, RELIC_TAG_WIDTH, RELIC_TAG_HEIGHT);
        // Lightcone box tag text (center aligned)
        ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLER} ${FONT_FAMILY}`;
        ctx.textAlign = 'center';
        ctx.fillStyle = primaryColor;
        ctx.fillText(`S${lightConeData.lightcone_rank}`, RELIC_RIGHT_TAG_TEXT_TL_X, RELIC_RIGHT_TAG_TEXT_TL_Y);
        ctx.textAlign = 'left';
        // Lightcone name highlight box
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(RELIC_RIGHT_STAT_BAR_TL_X, RELIC_RIGHT_STAT_BAR_TL_Y, RELIC_STAT_BAR_WIDTH, RELIC_STAT_BAR_HEIGHT);
        // Lightcone name
        ctx.font = `${FONT_BOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
        ctx.fillStyle = primaryColor;
        ctx.fillText(`${shortenString(lightConeData.lightcone_name, 20)}`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y);
        // Lightcone stats
        ctx.font = `${FONT_SEMIBOLD} ${FONT_SIZE_SMALLEST} ${FONT_FAMILY}`;
        ctx.fillStyle = secondaryColor;
        ctx.fillText(`Level`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y + RELIC_STAT_LINE_HEIGHT);
        ctx.fillText(`HP`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y + (RELIC_STAT_LINE_HEIGHT * 2));
        ctx.fillText(`ATK`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y + (RELIC_STAT_LINE_HEIGHT * 3));
        ctx.fillText(`DEF`, RELIC_RIGHT_STAT_NAME_TL_X, RELIC_RIGHT_STAT_NAME_TL_Y + (RELIC_STAT_LINE_HEIGHT * 4));
        // Lightcone stat values (right aligned)
        ctx.textAlign = 'right';
        ctx.fillText(`${lightConeData.lightcone_level}`, RELIC_RIGHT_STAT_VALUE_TL_X, RELIC_RIGHT_STAT_VALUE_TL_Y + RELIC_STAT_LINE_HEIGHT);
        ctx.fillText(`${lightConeData.lightcone_hp}`, RELIC_RIGHT_STAT_VALUE_TL_X, RELIC_RIGHT_STAT_VALUE_TL_Y + (RELIC_STAT_LINE_HEIGHT * 2));
        ctx.fillText(`${lightConeData.lightcone_atk}`, RELIC_RIGHT_STAT_VALUE_TL_X, RELIC_RIGHT_STAT_VALUE_TL_Y + (RELIC_STAT_LINE_HEIGHT * 3));
        ctx.fillText(`${lightConeData.lightcone_def}`, RELIC_RIGHT_STAT_VALUE_TL_X, RELIC_RIGHT_STAT_VALUE_TL_Y + (RELIC_STAT_LINE_HEIGHT * 4));
        ctx.textAlign = 'left';
    } catch {
        console.log('Lightcone not found.');
    }
}

async function drawBottom(uid, level, achievementCount, primaryColor, showUID) {
    ctx.font = `${FONT_BOLD} ${FONT_SIZE_NORMAL} ${FONT_FAMILY}`;
    ctx.fillStyle = primaryColor;
    if (showUID) {
        ctx.fillText(`UID: ${uid}`, UID_TL_X, UID_TL_Y);
    }
    // Text should align to the right
    ctx.textAlign = 'right';
    ctx.fillText(`Level: ${level}  |  Achievements: ${achievementCount}`, LEVEL_TL_X, LEVEL_TL_Y);
    ctx.textAlign = 'left';
}

async function drawWatermark(secondaryColor) {
    ctx.font = `${FONT_EXTRA_BOLD} ${FONT_SIZE_WATERMARK} ${FONT_FAMILY}`;
    ctx.fillStyle = secondaryColor;
    ctx.fillText('Meow Completionists', WATERMARK_TL_X, WATERMARK_TL_Y);

    ctx.font = `${FONT_SEMIBOLD} ${FONT_SIZE_WATERMARK} ${FONT_FAMILY}`;
    ctx.fillText('@yookers | discord.gg/chives', WATERMARK_TL_X, WATERMARK_TL_Y + WATERMARK_LINE_HEIGHT);
}

async function drawExtras(primaryColor, secondaryColor) {

}

function extractPlayerData(jsonData) {
    const player = jsonData.player;
    const player_uid = player.uid;
    const player_nickname = player.nickname;
    const player_level = player.level;
    const player_achievement_count = player.space_info.achievement_count;

    return { player_uid, player_nickname, player_level, player_achievement_count }
}

function extractCharacterData(character_jsonData) {
    const character = character_jsonData;
    const character_id = character.id
    const character_name = character.name;
    const character_rank = character.rank;
    const character_level = character.level;
    const character_icon_url = character.icon;
    const character_portrait_url = character.portrait;
    const character_preview_url = character.preview;
    const character_path_icon_url = character.path.icon;
    const character_element_icon_url = character.element.icon;

    return { character_id, character_name, character_rank, character_level, character_icon_url, character_portrait_url, character_preview_url, character_path_icon_url, character_element_icon_url }
}

function extractCharacterSkillsData(character_jsonData) {
    const character = character_jsonData;
    // Capitalize first letter of skill name for ease of use
    const character_Basic_icon_url = character.skills[0].icon;
    const character_Basic_level = character.skills[0].level;
    const character_Skill_icon_url = character.skills[1].icon;
    const character_Skill_level = character.skills[1].level;
    const character_Ultimate_icon_url = character.skills[2].icon;
    const character_Ultimate_level = character.skills[2].level;
    const character_Talent_icon_url = character.skills[3].icon;
    const character_Talent_level = character.skills[3].level;

    return { character_Basic_icon_url, character_Basic_level, character_Skill_icon_url, character_Skill_level, character_Ultimate_icon_url, character_Ultimate_level, character_Talent_icon_url, character_Talent_level };
}

function extractCharacterAttributesData(character_jsonData) {
    const attributes = character_jsonData.attributes;
    const attributes_base_hp = attributes[0].display;
    const attributes_base_hp_icon = attributes[0].icon;
    const attributes_base_atk = attributes[1].display;
    const attributes_base_atk_icon = attributes[1].icon;
    const attributes_base_def = attributes[2].display;
    const attributes_base_def_icon = attributes[2].icon;
    const attributes_base_spd = attributes[3].display;
    const attributes_base_spd_icon = attributes[3].icon;
    const attributes_base_crit_rate = attributes[4].display;
    const attributes_base_crit_rate_icon = attributes[4].icon;
    const attributes_base_crit_dmg = attributes[5].display;
    const attributes_base_crit_dmg_icon = attributes[5].icon;

    return { attributes_base_hp, attributes_base_hp_icon, attributes_base_atk, attributes_base_atk_icon, attributes_base_def, attributes_base_def_icon, attributes_base_spd, attributes_base_spd_icon, attributes_base_crit_rate, attributes_base_crit_rate_icon, attributes_base_crit_dmg, attributes_base_crit_dmg_icon };
}

function extractCharacterAdditionsData(character_jsonData) {
    const additions = character_jsonData.additions;

    return additions;
}

function extractRelicData(character_jsonData) {
    const relics = character_jsonData.relics;
    const relicData = relics.map(relic => {
        const level = relic.level;
        const icon_url = relic.icon;
        const main_affix = {
            name: relic.main_affix.name,
            display: relic.main_affix.display
        };

        const sub_affix = relic.sub_affix.map(sub => ({
            name: sub.name,
            display: sub.display
        }));

        return { level, icon_url, main_affix, sub_affix };
    });

    return relicData;
}

function extractLightConeData(character_jsonData) {
    const lightcone = character_jsonData.light_cone;
    const lightcone_id = lightcone.id;
    const lightcone_name = lightcone.name;
    const lightcone_rank = lightcone.rank;
    const lightcone_level = lightcone.level;
    const lightcone_preview_url = lightcone.preview;
    const lightcone_hp = lightcone.attributes[0].display;
    const lightcone_atk = lightcone.attributes[1].display;
    const lightcone_def = lightcone.attributes[2].display;

    return { lightcone_id, lightcone_name, lightcone_rank, lightcone_level, lightcone_preview_url, lightcone_hp, lightcone_atk, lightcone_def };
}

async function cropImage(image_url, targetWidth, targetHeight, scaleFactor, xOffset = 0, yOffset = 0) {
    const image = await loadImage(`${ASSETS_BASE_URL}${image_url}`);

    const scaleRatio = targetWidth / image.width * scaleFactor;
    const scaledWidth = image.width * scaleRatio;
    const scaledHeight = image.height * scaleRatio;

    // Create a canvas to hold the resized image
    const scaledCanvas = createCanvas(scaledWidth, scaledHeight);
    const scaledCtx = scaledCanvas.getContext('2d');

    scaledCtx.drawImage(
        image,
        0, 0, // Draw the image at 0,0 on the canvas
        image.width, image.height, // Original image size
        0, 0, // Place it at 0,0 on the new canvas
        scaledWidth, scaledHeight // Resize image size on the new canvas
    );

    // Now create another canvas to hold the final cropped image
    const croppedCanvas = createCanvas(targetWidth, targetHeight);
    const croppedCtx = croppedCanvas.getContext('2d');

    croppedCtx.drawImage(
        scaledCanvas,
        xOffset, yOffset, // Start cropping from this point on the scaled image
        targetWidth, targetHeight, // Crop size
        0, 0, // Place the cropped part at 0,0 in the final image
        targetWidth, targetHeight // Resized image
    );

    // Return the cropped canvas
    return croppedCanvas;
}

// Helper function to color a PNG image with a color
async function colorImage(imageURL, color) {
    const image = await loadImage(imageURL);
    // Create an off-screen canvas and context
    const coloringCanvas = new createCanvas(image.width, image.height);
    const coloringCtx = coloringCanvas.getContext('2d');

    coloringCtx.drawImage(image, 0, 0);

    // Apply the color overlay
    coloringCtx.globalCompositeOperation = 'source-atop';
    coloringCtx.fillStyle = color;
    coloringCtx.fillRect(0, 0, coloringCtx.canvas.width, coloringCtx.canvas.height);

    return coloringCanvas;
}

function shortenStatName(relicData) {
    const elements = ['Physical', 'Fire', 'Ice', 'Lightning', 'Wind', 'Quantum', 'Imaginary'];
    relicData.forEach(relic => {
        // Shortening names in main_affix
        elements.forEach(element => {
            if (relic.main_affix.name === `${element} DMG Boost`) {
                relic.main_affix.name = `${element} DMG`;
            }
        });
        if (relic.main_affix.name === "Energy Regeneration Rate") {
            relic.main_affix.name = "Energy Regen";
        }
        if (relic.main_affix.name === "Outgoing Healing Boost") {
            relic.main_affix.name = "Healing Boost";
        }
    });
    return relicData;
}

// Helper function to shorten long lightcone names
function shortenString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    } else {
        return str;
    }
}

function sortAdditions(additions) {
    const elements = ['Physical', 'Fire', 'Ice', 'Lightning', 'Wind', 'Quantum', 'Imaginary'];
    // Define the order of the attributes
    const attributeOrder = [
        'HP', 'ATK', 'DEF', 'SPD', 'CRIT Rate', 'CRIT DMG', 'Break Effect',
        'Outgoing Healing Boost', 'Energy Regeneration Rate',
        'Effect Hit Rate', 'Effect RES', 'Elemental DMG Boost'
    ];
    // Create an object with keys in the desired order
    let result = {};
    for (let attribute of attributeOrder) {
        result[attribute] = {
            name: '',
            icon: '',
            display: '',
        };
    }
    // Process the additions array
    for (let addition of additions) {
        // If the attribute name contains "DMG Boost", assign it to the "Elemental DMG Boost" key
        let isElementalDMGBoost = false;
        for (let element of elements) {
            if (addition.name.includes(`${element} DMG Boost`)) {
                isElementalDMGBoost = true;
                break;
            }
        }
        if (isElementalDMGBoost) {
            result['Elemental DMG Boost'] = {
                name: addition.name,
                icon: addition.icon,
                display: addition.display,
            };
        }
        // For all other attributes, just assign the display value
        else {
            result[addition.name] = {
                name: addition.name,
                icon: addition.icon,
                display: addition.display,
            };
        }
    }
    // Remove unused attributes
    for (let attribute in result) {
        if (result[attribute].name === '') {
            delete result[attribute];
        }
    }

    return result;
}

// Helper function to prepend a '0' to a number if it is less than 10
function prependZero(str) {
    if (parseInt(str, 10) < 10) {
        return '0' + str;
    }
    return str;
}

// Helper function to convert RGB to Hex, RBG format is [r, g, b]
function rgbToHex(rgb) {
    return '#' + rgb.map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function addBaseValue(characterAdditionsData, baseValue, additionKey) {
    let base = parseInt(baseValue, 10);
    if (characterAdditionsData[additionKey]) {
        base += parseInt(characterAdditionsData[additionKey].display, 10);
        delete characterAdditionsData[additionKey];
    }
    return base;
}

function addBaseValueFloat(characterAdditionsData, baseValue, additionKey) {
    let base = parseFloat(baseValue, 10);
    if (characterAdditionsData[additionKey]) {
        base += parseFloat(characterAdditionsData[additionKey].display);
        delete characterAdditionsData[additionKey];
    }
    return base;
}

// Uses 'node-vibrant' to generate a color palette from an image
async function generateColorPalette(imageURL) {
    const palette = await Vibrant.from(imageURL).getPalette();

    const primaryColor = rgbToHex(palette.DarkVibrant._rgb);
    const secondaryColor = rgbToHex(palette.LightMuted._rgb);

    return { primaryColor, secondaryColor };
}

async function checkColorCache(characterID, imageURL) {
    let colorsData = JSON.parse(fs.readFileSync(join(__dirname, 'default-colors.json')));
    if (!colorsData[characterID]) {
        const { primaryColor, secondaryColor } = await generateColorPalette(imageURL);

        colorsData[characterID] = {
            primaryColor,
            secondaryColor
        };

        fs.writeFileSync(join(__dirname, 'default-colors.json'), JSON.stringify(colorsData, null, 2));
    }

    return colorsData[characterID];
}

async function drawProfile(UID, characterIndex, primaryColor, secondaryColor, showWatermark, showUID, localDebugToggle = false) {
    // Get JSON data from API
    const response = await fetch(`${API_BASE_URL_PREPEND}${UID}${API_BASE_URL_APPEND}`);
    const jsonData = await response.json();
    // Get JSON data from local file
    //const rawData = await fs.promises.readFile(LOCAL_TEST_JSON);
    //const jsonData = JSON.parse(rawData);
    const playerData = extractPlayerData(jsonData);
    const characterSelection = jsonData.characters[characterIndex]
    const characterData = extractCharacterData(characterSelection);
    const characterSkillsData = extractCharacterSkillsData(characterSelection);
    const characterAttributesData = extractCharacterAttributesData(characterSelection);
    const characterAdditionsData = sortAdditions(extractCharacterAdditionsData(characterSelection));
    const relicsData = shortenStatName(extractRelicData(characterSelection));
    const lightConeData = extractLightConeData(characterSelection);

    // If the character is not in the cache, generate the color palette and add it to the cache
    if (!primaryColor && !secondaryColor) {
        //const palette = await checkColorCache(characterData.character_id, `${ASSETS_BASE_URL}${characterData.character_icon_url}`);
        // For now just generate a new color palette every time until proper caching is implemented
        const palette = await generateColorPalette(`${ASSETS_BASE_URL}${characterData.character_icon_url}`);
        primaryColor = palette.primaryColor;
        secondaryColor = palette.secondaryColor;
    }

    await drawBackground(primaryColor, secondaryColor);
    await drawHeader(playerData.player_nickname, secondaryColor);
    await drawRelics(relicsData, lightConeData, primaryColor, secondaryColor);
    await drawCharacterSkills(characterSkillsData, primaryColor, secondaryColor);
    await drawCharacterWindow(characterData, primaryColor, secondaryColor);
    await drawCharacterStats(characterAttributesData, characterAdditionsData, secondaryColor);
    if (showWatermark) {
        await drawWatermark(secondaryColor);
    }
    await drawBottom(playerData.player_uid, playerData.player_level, playerData.player_achievement_count, primaryColor, showUID);
    //await drawExtras(primaryColor, secondaryColor);

    const pngData = await canvas.encode('png') // JPEG, AVIF and WebP are also supported
    // encoding in libuv thread pool, non-blocking

    if (localDebugToggle) {
        await fs.promises.writeFile(join(__dirname, 'out.png'), pngData);
        return join(__dirname, 'out.png');
    }
    const fileName = `out_${Date.now()}.png`;
    await fs.promises.writeFile((`/tmp/${fileName}`), pngData);
    return join(`/tmp/${fileName}`);
}

// Load in the 'Inter' font
app.use(express.static(join(__dirname, 'fonts')));

// TODO: Show Relic star level (3, 4, 5 star)
// TODO: Display region of player
// TODO: Display relic score

app.get('/api/generate', async (req, res) => {
    const { uid, characterselection, primarycolor, secondarycolor, showwatermark, showuid } = req.query;
    try {
        const showWatermark = showwatermark !== 'false';
        const showUID = showuid !== 'false';
        const characterIndex = characterselection ? characterselection : 0;
        // Append '#' to color codes if they are not null
        const primaryColor = primarycolor ? `#${primarycolor}` : null;
        const secondaryColor = secondarycolor ? `#${secondarycolor}` : null;
        const imagePath = await drawProfile(uid, characterIndex, primaryColor, secondaryColor, showWatermark, showUID, LOCAL_DEBUG);

        res.sendFile(imagePath, (err) => {
            if (!err) {
                // If there was no error sending the file, delete it from the server
                fs.unlink(imagePath, (err) => {
                    if (err) console.error(`Error deleting file ${imagePath}:`, err);
                });
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred:', error: error.toString() });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;