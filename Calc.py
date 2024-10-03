import random
import time

def save_result(final_score, level, correct_answers, questions_answered, success_rate, formatted_time):
    # Open the file in append mode and write the result
    with open('results.txt', 'a') as file:
        file.write(f"Date: {time.strftime('%Y-%m-%d')}, Level: {level}, Correct Answers: {correct_answers}/{questions_answered}, Success Rate: {success_rate:.2%}, Duration: {formatted_time}, Score: {final_score}\n\n")

def calc():
    while True:  # This loop will run until the user decides to exit
        # Welcome!     
        welcome = print("Let's see how fast you can calculate!\n")

        # Flag to track whether the game was restarted
        restart_flag = False 

        # Questions
        total_questions = 30

        # Initialize variables to keep track of the game
        questions_answered = 0
        correct_answers = 0
        score = 100


        #Rules
        print("Rules:")
        print("To get a 100 score, you need to achieve the following:")
        print("a. Complete the game in 5 minutes or less.")
        print("b. Answer 30 questions correctly.\n")
        print("- For every wrong answer, you will lose 3 points.")
        print("- For every 10 seconds beyond 5 minutes, you will lose 1 point.\n")

        # Levels
        print("Levels Menu:\n1: Calculate numbers until 10\n2: Calculate numbers until 20\n3: Calculate numbers until 50\n4: Calculate numbers until 100\n")

        # Choice
        level = input("Choose your level now: ")

        # Game choice
        if level == "1":
            choice = 10
        elif level == "2":
            choice = 20
        elif level == "3":
            choice = 50
        elif level == "4":
            choice = 100
        else:
            print("Invalid choice. Try again.\n")
            continue  # Restart the game loop

        # Start timing
        print("At any time during the game, press 'r' to restart.")
        start_time = time.time()

        # Game
        for question_num in range(1, total_questions + 1):
            try:
                num1 = random.randint(1, choice)
                num2 = random.randint(1, choice)
                a = input(f"{question_num}. {num1} * {num2} = ")
                if a.lower() == 'r':  # User wants to restart
                    score = 0
                    restart_flag = True  # Set the restart flag to true
                    print("Restarting the game...\n")
                    time.sleep(1)  # Optional delay for clarity
                    break  # Exit the loop and restart the game
                correct = num1 * num2
                if int(a) == correct:
                    print("Correct!")
                    correct_answers += 1
                    questions_answered += 1
                else:
                    print(f"Wrong! The correct answer is: {correct}")
                    questions_answered += 1  # Increment the number of questions answered
                    score -= 3
            except ValueError:
                print(f"Wrong! The correct answer is: {correct}")
                score -= 3
                questions_answered += 1


            
        

        # End timing
        end_time = time.time()
        duration_seconds = end_time - start_time

        # Calculate time penalty
        time_penalty = max(0, (duration_seconds - 300) / 10) * 1

        # Calculate the final score
        final_score = round(max(0, score - time_penalty))

        # Convert seconds to minutes and seconds
        minutes = int(duration_seconds // 60)
        seconds = int(duration_seconds % 60)

        # Display the score
        print(f"Correct answers: {correct_answers}/{questions_answered}")
        # Display the timing
        formatted_time = f"{minutes:02}:{seconds:02}"  # Format as hh:mm
        print(f"Total time taken: {formatted_time}")
        #Display Score
        print(f"Final score: {final_score}\n")


        # Calculate Success Rate
        success_rate = correct_answers / questions_answered if questions_answered > 0 else 0


        # Restart the game immediately if press 'r'
        if restart_flag:
           continue  


        # Call the save_result function to save the result
        if not restart_flag:
            save_result(final_score, level, correct_answers, questions_answered, success_rate, formatted_time)

        # Prompt to play again
        again = input("Would you like to try again? Type 'y' to try again or any other key to exit: ")
        if again.lower() != "y":
            print("Goodbye")
            break  # Exit the game loop and end the program

calc()
