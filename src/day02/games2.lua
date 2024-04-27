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


-- Find the score of each color and update the highs if needed
local function get_color_score(highs, game_records, game_no, color_no)
    for str in string.gmatch(game_records[game_no], "([^,]+)") do
        if string.find(str, COLOURS[color_no]) then
            local color_score = str:match("([^%s]+)") + 0
            if highs[color_no] < color_score then
                highs[color_no] = color_score
            end

        end
    end
    return highs

end


-- Function to parse each line and calculate power
local function parse_line(input_line)
    local game_id = input_line:match("([^:]+):")
    local complete_game_record = input_line:match(":([^:]+)")
    local game_record_arr = {}
    local power = 1

    for str in string.gmatch(complete_game_record, "([^;]+)") do
        table.insert(game_record_arr, str)
    end

    -- Track highest encountered number of each color
    local highs = {0, 0, 0}

    for i = 1, #game_record_arr do
        for j = 1, #COLOURS do
            highs = get_color_score(highs, game_record_arr, i, j)
        end
    end

    print(table.concat(highs, ", "))

    for _, value in ipairs(highs) do
        power = power * value
    end

    return power
end

function string.starts(String,Start)
    return string.sub(String,1,string.len(Start))==Start
end

function mysplit (inputstr, sep)
    if sep == nil then
            sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str)
    end
    return t
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

    local input_line = input_array[1]

    local game_id = input_line:match("([^:]+):")
    local complete_game_record = input_line:match(":([^:]+)")

    local game_record_arr = {}
    local i = 1

    for str in string.gmatch(complete_game_record, "([^;]+)") do
        table.insert(game_record_arr, str)
    end

    print("--")

    print(game_id)
    print(table.concat(game_record_arr, "\n"))


    for i = 1, #input_array do
        if #input_array[i] > 0 then
            local current_game = parse_line(input_array[i])
            table.insert(line_values, current_game)
            print(current_game)
        else
            print(input_array[i])
        end
    end

    -- print(line_values)

    local sum = 0     for _, value in ipairs(line_values) do
        sum = sum + value
    end

    print("\n--------\nTotal:")
    print(sum)
end

-- Calling the main function
main()
