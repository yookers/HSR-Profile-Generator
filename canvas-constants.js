module.exports = {
    const: FONT_FAMILY = 'Inter, Noto Sans JP, Noto Sans SC, sans-serif',
    const: FONT_MEDIUM = '500',
    const: FONT_SEMIBOLD = '600',
    const: FONT_BOLD = '700',
    const: FONT_EXTRA_BOLD = '800',
    const: FONT_SIZE_WATERMARK = '16px',
    const: FONT_SIZE_SMALLEST = '20px',
    const: FONT_SIZE_SMALLER = '24px',
    const: FONT_SIZE_NORMAL = '32px',
    const: FONT_SIZE_BIG = '48px',
    const: FONT_SIZE_BIGGEST = '96px',
    const: FONT_LINE_HEIGHT = 25,

    // Magical numbers :3
    const: RELIC_LEFT_ITEM_TL_X = 83,
    const: RELIC_LEFT_ITEM_TL_Y = 204,
    const: RELIC_RIGHT_ITEM_TL_X = 555,
    const: RELIC_RIGHT_ITEM_TL_Y = RELIC_LEFT_ITEM_TL_Y,
    const: RELIC_ITEM_DIMENSIONS = 128,
    // Relic stat name text position (left aligned)
    const: RELIC_LEFT_STAT_NAME_TL_X = 233,
    const: RELIC_LEFT_STAT_NAME_TL_Y = 213,
    const: RELIC_RIGHT_STAT_NAME_TL_X = 705,
    const: RELIC_RIGHT_STAT_NAME_TL_Y = 213,
    // Relic main stat highlight bar dimensions and position
    const: RELIC_STAT_BAR_WIDTH = 254,
    const: RELIC_STAT_BAR_HEIGHT = 26,
    const: RELIC_LEFT_STAT_BAR_TL_X = RELIC_LEFT_STAT_NAME_TL_X - 4,
    const: RELIC_LEFT_STAT_BAR_TL_Y = RELIC_LEFT_STAT_NAME_TL_Y - 5,
    const: RELIC_RIGHT_STAT_BAR_TL_X = RELIC_RIGHT_STAT_NAME_TL_X - 4,
    const: RELIC_RIGHT_STAT_BAR_TL_Y = RELIC_RIGHT_STAT_NAME_TL_Y - 5,
    // Relic stat value text position (right aligned)
    const: RELIC_LEFT_STAT_VALUE_TL_X = 479,
    const: RELIC_LEFT_STAT_VALUE_TL_Y = RELIC_LEFT_STAT_NAME_TL_Y,
    const: RELIC_RIGHT_STAT_VALUE_TL_X = 951,
    const: RELIC_RIGHT_STAT_VALUE_TL_Y = RELIC_RIGHT_STAT_NAME_TL_Y,
    // Relic level tag dimensions and position
    const: RELIC_TAG_WIDTH = 64,
    const: RELIC_TAG_HEIGHT = 28,
    const: RELIC_LEFT_TAG_TL_X = RELIC_LEFT_ITEM_TL_X,
    const: RELIC_LEFT_TAG_TL_Y = RELIC_LEFT_ITEM_TL_Y,
    const: RELIC_RIGHT_TAG_TL_X = RELIC_RIGHT_ITEM_TL_X,
    const: RELIC_RIGHT_TAG_TL_Y = RELIC_RIGHT_ITEM_TL_Y,
    // Relic level tag text position (centered)
    const: RELIC_LEFT_TAG_TEXT_TL_X = RELIC_LEFT_ITEM_TL_X + 32,
    const: RELIC_LEFT_TAG_TEXT_TL_Y = RELIC_LEFT_ITEM_TL_Y + 5,
    const: RELIC_RIGHT_TAG_TEXT_TL_X = RELIC_RIGHT_ITEM_TL_X + 32,
    const: RELIC_RIGHT_TAG_TEXT_TL_Y = RELIC_RIGHT_ITEM_TL_Y + 5,
    // Relic separator
    const: RELIC_HEIGHT_PADDING = 170,
    const: RELIC_STAT_LINE_HEIGHT = 25,

    // Skill dimensions and position
    const: SKILL_ITEM_TL_X = 555,
    const: SKILL_ITEM_TL_Y = 733,
    const: SKILL_ITEM_DIMENSIONS = 96,
    // Skill tag dimensions and position
    const: SKILL_TAG_WIDTH = 48,
    const: SKILL_TAG_HEIGHT = 28,
    const: SKILL_TAG_TL_X = SKILL_ITEM_TL_X,
    const: SKILL_TAG_TL_Y = SKILL_ITEM_TL_Y,
    // Skill tag text position (centered)
    const: SKILL_TAG_TEXT_TL_X = SKILL_ITEM_TL_X + 24,
    const: SKILL_TAG_TEXT_TL_Y = SKILL_ITEM_TL_Y + 5,
    // Skill description text position (left aligned)
    const: SKILL_DESC_TL_X = SKILL_ITEM_TL_X,
    const: SKILL_DESC_TL_Y = 842,
    // Skill separator
    const: SKILL_WIDTH_PADDING = 100,

    // Character art window dimensions and position
    const: CHARACTER_ART_TL_X = 1027,
    const: CHARACTER_ART_TL_Y = 204,
    const: CHARACTER_ART_WIDTH = 490,
    const: CHARACTER_ART_HEIGHT = 312,
    const: CHARACTER_ART_SCALE_RATIO = 0.8,
    const: CHARACTER_ART_CROP_X_OFFSET = 0,
    const: CHARACTER_ART_CROP_Y_OFFSET = 10,
    // Character eidolon tag dimensions and position
    const: CHARACTER_EIDOLON_TAG_TL_X = CHARACTER_ART_TL_X,
    const: CHARACTER_EIDOLON_TAG_TL_Y = CHARACTER_ART_TL_Y,
    const: CHARACTER_EIDOLON_TAG_WIDTH = 64,
    const: CHARACTER_EIDOLON_TAG_HEIGHT = 28,
    // Character eidolon tag text position (centered)
    const: CHARACTER_EIDOLON_TAG_TEXT_TL_X = CHARACTER_EIDOLON_TAG_TL_X + 32,
    const: CHARACTER_EIDOLON_TAG_TEXT_TL_Y = CHARACTER_EIDOLON_TAG_TL_Y + 5,
    // Character name text position (right aligned)
    const: CHARACTER_NAME_TL_X = 1517,
    const: CHARACTER_NAME_TL_Y = 145,
    // Character path and element position
    const: CHARACTER_ELEMENT_TL_X = 1430,
    const: CHARACTER_ELEMENT_TL_Y = 226,
    const: CHARACTER_PATH_TL_X = 1430,
    const: CHARACTER_PATH_TL_Y = 318,
    const: CHARACTER_ELEMENT_DIMENSIONS = 80,
    const: CHARACTER_PATH_DIMENSIONS = 80,
    // Character level highlight bar
    const: CHARACTER_LEVEL_BAR_TL_X = 1023,
    const: CHARACTER_LEVEL_BAR_TL_Y = 520,
    const: CHARACTER_LEVEL_BAR_WIDTH = 498,
    const: CHARACTER_LEVEL_BAR_HEIGHT = 32,
    // Character level text position (number is right aligned)
    const: CHARACTER_LEVEL_TEXT_TL_X = 1035,
    const: CHARACTER_LEVEL_TEXT_TL_Y = 526,
    const: CHARACTER_LEVEL_VALUE_TL_X = 1509,
    const: CHARACTER_LEVEL_VALUE_TL_Y = CHARACTER_LEVEL_TEXT_TL_Y,

    // Character stat icon dimensions and position
    const: CHARACTER_STAT_ICON_TL_X = 1017,
    const: CHARACTER_STAT_ICON_TL_Y = 553,
    const: CHARACTER_STAT_ICON_DIMENSIONS = 32,
    const: CHARACTER_STAT_ICON_HEIGHT_PADDING = 25,

    // Character stat name total position
    const: CHARACTER_STAT_NAME_TL_X = 1057,
    const: CHARACTER_STAT_NAME_TL_Y = 561,
    // Character stat value total position (right aligned)
    const: CHARACTER_STAT_VALUE_TL_X = 1517,
    const: CHARACTER_STAT_VALUE_TL_Y = CHARACTER_STAT_NAME_TL_Y,
    // Character stat separator
    const: CHARACTER_STAT_LINE_HEIGHT = 25,

    // Player name text position (left aligned)
    const: PLAYER_NAME_TL_X = 83,
    const: PLAYER_NAME_TL_Y = 75,
    // Background dimensions and bottom bar position
    const: BACKGROUND_BORDER_SIZE = 16,
    const: BACKGROUND_BOTTOM_BAR_HEIGHT = 74,
    const: BACKGROUND_BOTTOM_BAR_TL_Y = 1000 - BACKGROUND_BOTTOM_BAR_HEIGHT,
    // Bottom bar text info position (uid, level, achievements)
    const: UID_TL_X = 60,
    const: UID_TL_Y = BACKGROUND_BOTTOM_BAR_TL_Y + 25,
    // Level and achievements text position (right aligned)
    const: LEVEL_TL_X = 1530,
    const: LEVEL_TL_Y = UID_TL_Y,
    // Watermark text position (left aligned), 
    const: WATERMARK_TL_X = 93,
    const: WATERMARK_TL_Y = 868,
    const: WATERMARK_LINE_HEIGHT = 20,
}