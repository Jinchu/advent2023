#!/usr/bin/env lua

-- Defining colours
local COLOURS = {"red", "green", "blue"}

-- see if the file exists
local function file_exists(file)
    local f = io.open(file, "rb")
    if f then f:close() end
    return f ~= nil
end


-- Function to read input file and return an array
local function get_input_array()
    -- Read the file and split it into lines
    local file_name = "input.txt"
    if not file_exists(file_name) then
        return {}
    end

    local line_array = {}

    for line in io.lines(file_name) do
        line_array[#line_array + 1] = line
    end

    return line_array
end


-- Function to parse each line and calculate power
local function parse_line(input_line)
    local game_id = input_line:match("([^:]+):")
    local game_record = input_line:match(":([^;]+);")
    local power = 1

    -- Track highest encountered number of each color
    local highs = {0, 0, 0}

    for draw in game_record:gmatch("[^;]+") do
        for i, colour in ipairs(COLOURS) do
            if draw:find(colour) then
                local color_number_str = draw:match("(%d+)")
                local color_number = tonumber(color_number_str)
                if highs[i] < color_number then
                    highs[i] = color_number
                end
            end
        end
    end

    for _, value in ipairs(highs) do
        power = power * value
    end

    print("-----")
    print(table.concat(highs, ", "))

    return power
end

function string.starts(String,Start)
    return string.sub(String,1,string.len(Start))==Start
end

-- Main function
local function main()
    local line_values = {}
    local input_array = get_input_array()

    -- for i = 1, #input_array do
    --     if #input_array[i] > 0 then
    --         if string.starts(input_array[i], "Game 5") then
    --             table.insert(line_values, input_array[i])
    --         end

    --     end
    -- end

    print("")
    print("--")
    print("")

    local input_line = input_array[55]

    local game_id = input_line:match("([^:]+):")
    local game_record = input_line:match(":([^;]+);")

    print(game_id)
    print(game_record)


    -- for i = 1, #input_array do
    --     if #input_array[i] > 0 then
    --         local current_game = parse_line(input_array[i])
    --         table.insert(line_values, current_game)
    --         print(current_game)
    --     else
    --         print(input_array[i])
    --     end
    -- end

    -- print(line_values)
    -- for index, data in ipairs(line_values) do
    --     print(index)
    --     print(data)

    -- end

    local sum = 0
--[[     for _, value in ipairs(lineValues) do
        sum = sum + value
    end
 ]]
    print("\n--------\nTotal:")
    print(sum)
end

-- Calling the main function
main()
