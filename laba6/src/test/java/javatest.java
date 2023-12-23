import com.codeborne.selenide.Condition;
import org.junit.Test;
import static com.codeborne.selenide.Selenide.$x;
import static com.codeborne.selenide.Selenide.open;

public class javatest {
    @Test
    public void LabTest(){
        open("https://google.com/");
        $x("//textarea[@name='q']")
                .setValue("Теплов Ярослав Игоревич")
                .pressEnter();
        $x("//div[@id='result-stats']")
                .shouldBe(Condition.visible);
    }
}