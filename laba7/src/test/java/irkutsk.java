import com.codeborne.selenide.Condition;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static com.codeborne.selenide.Selenide.*;

public class irkutsk {
    @Test
    public void AddAdress(){
        WebDriver driver = new ChromeDriver();
        driver.get("https://irkutsk.yobidoyobi.ru/?");
        driver.findElement(By.className("_2mEvbE")).click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                  .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");
        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.quit();
    }
    @Test
    public void ClickPromotion(){
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru/promotions");
        driver.findElement(By.xpath("//div[@class='e2abok']//div[1]//button[1]"))
                .click();
        driver.quit();

    }
    @Test
    public void ClickProduct(){
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]"))
                .click();
        driver.quit();

    }

    @Test
    public void AddToCart(){
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");
        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.quit();

    }
    @Test
    public void ClickOnLogo() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//a[normalize-space()='']//img[@fetchpriority='high']")).click();
        driver.quit();

    }

    @Test
    public void SelectSmthInCartModal() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
//        WebDriver driver = new ChromeDriver();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//div[@class='ReactModalPortal']//article[1]//button[1]")).click();
        driver.quit();

    }

    @Test
    public void PlusProductInCartModal() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
//        WebDriver driver = new ChromeDriver();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//div[@class='ReactModalPortal']//article[1]//button[1]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//div[@class='ReactModalPortal']//button[3]")).click();
        driver.quit();

    }

    @Test
    public void MinusProductInCartModal() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
//        WebDriver driver = new ChromeDriver();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//div[@class='ReactModalPortal']//article[1]//button[1]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//div[@class='ReactModalPortal']//div[@class='_1lNXFF']//button[1]")).click();
        //section[@class='_26cGnO']//*[name()='svg']
        //div[@class='ReactModalPortal']//div[@class='_1lNXFF']//button[1]
        driver.quit();

    }

    @Test
    public void ClearAllCart() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        driver.findElement(By.xpath("//h1[contains(text(),'Корзина')]//*[name()='svg']//*[name()='path' and contains(@d,'M12.1875 0')]")).click();
        sleep(1000);
        driver.findElement(By.xpath("//button[contains(text(),'Очистить')]")).click();
        //body/div[@id='__next']/section[@class='_1SwfDN _2wREEW']/section[@class='_1WGQGc _3IIzxZ']/main[@class='_20frAV']/section[@class='_3-OMag _3MfkcF _3pADeF']/article[1]//*[name()='svg']//*[name()='path' and contains(@d,'M12.1875 0')]
        driver.quit();

    }

    @Test
    public void DeleteProductFromCart() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(1000);
        driver.findElement(By.xpath("//body/div[@id='__next']/section[@class='_1SwfDN _2wREEW']/section[@class='_1WGQGc _3IIzxZ']/main[@class='_20frAV']/section[@class='_3-OMag _3MfkcF _3pADeF']/article[1]//*[name()='svg']//*[name()='path' and contains(@d,'M12.1875 0')]\n")).click();
        //button[contains(text(),'Перейти в меню')]
        //div[@aria-label='1 / 4']//button[@type='button'][contains(text(),'299 ₽')]
        driver.quit();

    }

    @Test
    public void BackOnMainPageAfterClearCart() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
        sleep(3000);
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(1000);
        driver.findElement(By.xpath("//body/div[@id='__next']/section[@class='_1SwfDN _2wREEW']/section[@class='_1WGQGc _3IIzxZ']/main[@class='_20frAV']/section[@class='_3-OMag _3MfkcF _3pADeF']/article[1]//*[name()='svg']//*[name()='path' and contains(@d,'M12.1875 0')]\n")).click();
        sleep(1000);

        driver.findElement(By.xpath("//button[contains(text(),'Перейти в меню')]")).click();
        driver.quit();

    }

    @Test
    public void AddProductInCartByButtonInProduct() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.quit();

    }

    @Test
    public void PlusProductInCartByButtonInProduct() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//button[3]//*[name()='svg']")).click();
        //div[@class='_1lNXFF _1LxR6p _2TZwic']//button[1]
        driver.quit();

    }

    @Test
    public void MinusProductInCartByButtonInProduct() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
                .click();
        driver.findElement(By.className("_1PM57c"))
                .findElement(By.tagName("input"))
                .sendKeys("1-я Батарейная");
        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");

        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
        sleep(5000);
        driver.findElement(By.xpath("//div[@class='_1lNXFF _1LxR6p _2TZwic']//button[1]")).click();
        driver.quit();

    }

    @Test
    public void ClickOnSearch() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//div[@class='_3rga__']//div[1]//*[name()='svg']//*[name()='rect']")).click();
        driver.quit();

    }

    @Test
    public void ClickOnFilters() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//div[@class='_3rga__']//div[2]//*[name()='svg']//*[name()='rect']")).click();
        driver.quit();

    }

    @Test
    public void SelectPickUp() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        driver.findElement(By.xpath("//section[@class='_2mEvbE']")).click();
        driver.findElement(By.xpath("//button[@class='_2LW5w2']")).click();
        sleep(2000);
        driver.findElement(By.xpath("//div[@class='ReactModalPortal']//li[1]")).click();
        sleep(2000);
        driver.findElement(By.xpath("//button[contains(text(),'Заберу здесь')]")).click();
        //button[@type='button']
        driver.quit();

    }

    @Test
    public void TestSliderRight() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        sleep(4000);
        driver.findElement(By.xpath("//button[@aria-label='Next slide']//*[name()='svg']//*[name()='circle' and contains(@cx,'17')]")).click();
        sleep(2000);
        driver.quit();

    }
    @Test
    public void TestSliderLeft() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        sleep(4000);
        driver.findElement(By.xpath("//button[@aria-label='Previous slide']//*[name()='svg']//*[name()='circle' and contains(@cx,'17')]")).click();
        sleep(2000);
        driver.quit();

    }

    @Test
    public void TestOpenMessanger() {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://irkutsk.yobidoyobi.ru");
        sleep(4000);
        driver.findElement(By.xpath("//iframe[@id='__threadswidget_chat__iframe']")).click();
        sleep(2000);

        driver.quit();
    }

//    @Test
//    public void AddOffTopInCart() {
//        WebDriver driver = new ChromeDriver();
//        driver.manage().window().maximize();
//        driver.get("https://irkutsk.yobidoyobi.ru");
//        driver.findElement(By.xpath("//button[contains(text(),'Наборы')]")).click();
//        sleep(2000);
//        driver.findElement(By.xpath("//body//div[@id='__next']//section//section[1]//div[2]//article[1]//div[2]//div[2]//div[1]//button[1]"))
//                .click();
//        driver.findElement(By.className("_1PM57c"))
//                .findElement(By.tagName("input"))
//                .sendKeys("1-я Батарейная");
//        driver.findElement(By.xpath("//input[@name='houseNumber']")).sendKeys("1");
//        driver.findElement(By.xpath("//input[@name='building']")).sendKeys("1");
//        driver.findElement(By.xpath("//input[@name='entrance']")).sendKeys("1");
//        driver.findElement(By.xpath("//input[@name='floor']")).sendKeys("1");
//        driver.findElement(By.xpath("//input[@name='flatNumber']")).sendKeys("1");
//        driver.findElement(By.xpath("//textarea[@name='comment']")).sendKeys("комментарий");
//
//        driver.findElement(By.className("_2SzGGN")).findElement(By.tagName("button")).click();
////        WebDriver driver = new ChromeDriver();
//        driver.findElement(By.xpath("//section[@class='_26cGnO']//*[name()='svg']")).click();
//        sleep(5000);
//        driver.findElement(By.xpath("//button[contains(text(),'Корзина')]")).click();
//        sleep(3000);
//        driver.findElement(By.xpath("//*[name()='path' and contains(@d,'M15.5837 1')]")).click();
//        sleep(3000);
//        executeJavaScript("arguments[0].click()", driver.findElement(By.xpath("//div[@aria-label='1 / 4']//button[@type='button'][contains(text(),'299 ₽')]")));
//    }
}