const aiService = require('../services/aiService');

exports.generateHealthPlan = async (req, res) => {
  try {
    const { age, weight, height, activityLevel, dietaryRestrictions, sleepIssues } = req.body;

    console.log("Received body parameters:", { age, weight, height, activityLevel, dietaryRestrictions, sleepIssues });

    const sampleData = {
      age: age || 30,
      weight: weight || 70,
      height: height || 170,
      activityLevel: activityLevel || "moderate",
      dietaryRestrictions: dietaryRestrictions || "none",
      sleepIssues: sleepIssues || "insomnia"
    };

    console.log("Using data for health plan generation:", sampleData);

    const prompt = `Generate a personalized health plan for a ${sampleData.age}-year-old individual weighing ${sampleData.weight} kg and ${sampleData.height} cm tall. Their activity level is ${sampleData.activityLevel}, and they have the following dietary restrictions: ${sampleData.dietaryRestrictions}. They also report the following sleep issues: ${sampleData.sleepIssues}. Provide a diet plan and sleep routine in JSON format exactly matching this structure: {"diet_plan": {"caloric_intake": 2000, "macronutrients": {"carbohydrates": "50%", "proteins": "30%", "fats": "20%"}, "meal_plan": {"breakfast": {"time": "8:00 AM", "items": ["string"]}, "lunch": {"time": "1:00 PM", "items": ["string"]}, "dinner": {"time": "7:00 PM", "items": ["string"]}}}, "sleep_routine": {"bedtime": "10:00 PM", "wake_time": "6:00 AM", "pre_sleep_activities": ["string"]}}. Do not use markdown formatting or code blocks. Only return the JSON object.`;

    console.log("Sending prompt to Gemini:", prompt);

    // aiService.generateHealthPlan returns a plain string (Gemini response text)
    const responseText = await aiService.generateHealthPlan(prompt);

    console.log("Raw API response:", responseText);

    // Strip any markdown code fences Gemini may add despite the prompt instruction
    let cleanedContent = responseText.trim();
    cleanedContent = cleanedContent.replace(/```json\s?|\s?```/g, '').trim();

    console.log("Cleaned content:", cleanedContent);

    try {
      const healthPlan = JSON.parse(cleanedContent);
      console.log("Generated health plan:", healthPlan);
      
      res.json({
        message: 'Health plan generated successfully!',
        healthPlan: healthPlan
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('Raw content:', cleanedContent);
      res.status(500).json({ error: 'An error occurred while parsing the health plan' });
    }
  } catch (error) {
    console.error('Error generating health plan:', error);
    res.status(500).json({ error: 'An error occurred while generating the health plan' });
  }
};
